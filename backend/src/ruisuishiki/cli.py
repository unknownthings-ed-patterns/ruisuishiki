"""ruisuishiki CLI——コマンドラインから問題を生成する。

開発フェーズの中心インターフェース。第3弾§10.2 段階1の完了条件である
「CLIで整合性検証済みの問題5問が JSON で出力される」をここで実装する。
"""

from __future__ import annotations

import json
import sys
import uuid
from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.table import Table

from .generation import GenerationMode, generate_materials, load_from_pool
from .models import (
    ContextCategory,
    Problem,
    ProblemSource,
    VerificationLog,
)
from .patterns import ALL_PATTERNS, get_pattern
from .verification import VerificationFailure, verify_problem

app = typer.Typer(
    help="戸田『推理式指導算術』をAI時代に再構成する CLI",
    rich_markup_mode="rich",
    no_args_is_help=True,
)
console = Console()


@app.command()
def patterns() -> None:
    """登録されている文型を一覧表示する。"""
    table = Table(title="登録されている文型")
    table.add_column("ID", style="cyan")
    table.add_column("単元")
    table.add_column("自然言語による記述")
    table.add_column("解式", style="magenta")
    table.add_column("難度", justify="right")

    for pid, p in ALL_PATTERNS.items():
        table.add_row(pid, p.unit, p.natural_language, p.formula_template, str(p.difficulty_tier))
    console.print(table)


@app.command()
def generate(
    pattern_id: Annotated[
        str, typer.Option("--pattern", "-p", help="文型ID（例: P1）")
    ] = "P1",
    context: Annotated[
        ContextCategory, typer.Option("--context", "-c", help="文脈カテゴリ")
    ] = ContextCategory.SHOPPING,
    count: Annotated[int, typer.Option("--count", "-n", help="生成する問題数")] = 5,
    mode: Annotated[
        GenerationMode,
        typer.Option("--mode", "-m", help="mock=プールから読む / live=APIを呼ぶ"),
    ] = GenerationMode.MOCK,
    seed: Annotated[
        int | None, typer.Option("--seed", "-s", help="ランダム抽出の seed（決定的にする）")
    ] = None,
    output: Annotated[
        Path | None, typer.Option("--output", "-o", help="出力先 JSON（省略時は標準出力）")
    ] = None,
) -> None:
    """指定文型の問題を count 個生成し、SymPy で検証して JSON で出力する。"""
    try:
        pattern = get_pattern(pattern_id)
    except KeyError as e:
        console.print(f"[red]{e}[/red]")
        raise typer.Exit(code=2) from e

    # 材料の取得
    if mode is GenerationMode.MOCK:
        console.print(
            f"[dim]mode=mock: {pattern_id}/{context.value} の材料プールから {count} 個抽出[/dim]"
        )
        try:
            materials = load_from_pool(pattern_id, context, count=count, seed=seed)
        except (FileNotFoundError, ValueError) as e:
            console.print(f"[red]{e}[/red]")
            raise typer.Exit(code=3) from e
    else:
        console.print(
            f"[dim]mode=live: Anthropic API を呼んで {count} 個生成[/dim]"
        )
        materials = generate_materials(pattern, context, count=count)

    # 各材料を検証し、Problem オブジェクトに変換
    problems: list[Problem] = []
    failures: list[tuple[str, str]] = []

    for m in materials:
        try:
            result, log = verify_problem(pattern, m.bindings)
        except VerificationFailure as e:
            failures.append((m.id, str(e)))
            continue

        # 質問文は段階2以降で別途処理。MVP段階1では場面文をそのまま使う
        question_text = (
            f"{m.scene_description} "
            f"{[v.role.value for v in pattern.variables if v.unknown][0]}は"
            f"いくらでしょう？"
        )

        problems.append(
            Problem(
                id=f"prob_{uuid.uuid4().hex[:8]}",
                pattern_id=pattern.id,
                material_id=m.id,
                question_text=question_text,
                answer=str(result.answer),
                verification_log=log,
                source=ProblemSource.GENERATED,
            )
        )

    # 結果表示
    out_data = {
        "pattern_id": pattern.id,
        "context": context.value,
        "mode": mode.value,
        "requested": count,
        "generated": len(problems),
        "verification_failures": len(failures),
        "problems": [p.model_dump(mode="json") for p in problems],
        "failures": [{"material_id": mid, "reason": reason} for mid, reason in failures],
    }
    payload = json.dumps(out_data, ensure_ascii=False, indent=2)

    if output is not None:
        output.write_text(payload, encoding="utf-8")
        console.print(f"[green]✓ {len(problems)}/{count} 問を {output} に保存[/green]")
    else:
        sys.stdout.write(payload + "\n")
        console.print(
            f"[green]✓ {len(problems)}/{count} 問を出力[/green]"
            + (f" / [yellow]{len(failures)} 件の検証失敗[/yellow]" if failures else ""),
            file=sys.stderr,
        )


@app.command()
def verify(
    pattern_id: Annotated[str, typer.Argument(help="文型ID（例: P1）")],
    bindings_json: Annotated[
        str,
        typer.Argument(
            help="既知変数の値を JSON で（例: '{\"A\":200,\"p\":0.7}'）"
        ),
    ],
) -> None:
    """指定された束縛で文型を評価し、解を表示する（デバッグ用）。"""
    try:
        pattern = get_pattern(pattern_id)
    except KeyError as e:
        console.print(f"[red]{e}[/red]")
        raise typer.Exit(code=2) from e

    try:
        binding_data = json.loads(bindings_json)
    except json.JSONDecodeError as e:
        console.print(f"[red]bindings の JSON が不正: {e}[/red]")
        raise typer.Exit(code=2) from e

    from .models import VariableBinding

    bindings = [VariableBinding(variable_name=k, value=v) for k, v in binding_data.items()]
    try:
        result, log = verify_problem(pattern, bindings)
        console.print(f"[green]✓ 解: {result.unknown_name} = {result.answer}[/green]")
        console.print(f"[dim]{log.sympy_output}[/dim]")
    except VerificationFailure as e:
        console.print(f"[red]✗ 検証失敗: {e}[/red]")
        raise typer.Exit(code=1) from e


if __name__ == "__main__":
    app()
