# /i18n-sync — Sincronização Obrigatória de Traduções

## Objetivo
Garantir que qualquer alteração de texto visível ao utilizador é refletida imediatamente em todos os idiomas suportados: **PT, EN, ES, FR**.

## Regra Obrigatória
Sempre que criares, alterares, moveres ou removeres texto de UI, tens de atualizar as traduções correspondentes em todos os idiomas.

## Quando Aplicar
Aplicar automaticamente quando houver mudanças em:
- títulos e subtítulos
- botões e CTAs
- labels, placeholders e mensagens de formulário
- mensagens de chat/assistente
- navegação, rodapé e conteúdos de secções
- metadados de página (title/description)

## Workflow
1. Identificar todos os textos alterados.
2. Atualizar a fonte de verdade das traduções (`src/i18n/site.ts`).
3. Garantir paridade estrutural entre idiomas (mesmas chaves em `pt`, `en`, `es`, `fr`).
4. Confirmar que os componentes usam chaves de tradução e não texto hardcoded.
5. Validar rapidamente a consistência antes de concluir.

## Checklist Final
- [ ] Alterações refletidas em `pt`
- [ ] Alterações refletidas em `en`
- [ ] Alterações refletidas em `es`
- [ ] Alterações refletidas em `fr`
- [ ] Sem texto novo hardcoded fora do dicionário
- [ ] Placeholders/tokens preservados em todos os idiomas

## Comando de apoio
```bash
rg -n "TODO|FIXME|TRANSLATE" src
```
