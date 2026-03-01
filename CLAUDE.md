# CLAUDE.md — Regras para Traduções Multidioma

## Regra Principal
Sempre que houver alteração de texto visível ao utilizador, aplicar obrigatoriamente a skill:

- `.claude/skills/i18n-sync.md`

## Política de Entrega
Nenhuma alteração textual deve ser concluída sem atualizar **PT, EN, ES e FR** na fonte de traduções do projeto (`src/i18n/site.ts`).

## Exceções
Só não aplicar se a alteração for exclusivamente técnica e sem qualquer impacto em texto de UI.
