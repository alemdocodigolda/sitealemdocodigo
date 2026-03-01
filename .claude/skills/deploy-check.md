# /deploy-check — Checklist Pré-Deploy

## Objetivo
Verificar que o site está pronto para publicação, sem erros visíveis, conteúdo em falta ou problemas de SEO.

---

## 1. Build sem Erros

```bash
pnpm build
```

- [ ] Build completa sem erros TypeScript
- [ ] Sem warnings críticos no output

---

## 2. i18n Completo

- [ ] Todas as chaves existem em `pt` e `en`
- [ ] Sem texto hardcoded em componentes (verificar com `rg -n "TODO|FIXME|TRANSLATE" src`)
- [ ] Placeholders e labels traduzidos em ambos os idiomas
- [ ] Página de termos (`/termos`) e privacidade (`/privacidade`) acessíveis

---

## 3. Links e Navegação

- [ ] Todos os links externos abrem com `target="_blank" rel="noopener noreferrer"`
- [ ] Links internos (anchors) apontam para IDs existentes (`#sobre`, `#projetos`, `#contacto`)
- [ ] Lang switcher muda entre PT (`/`) e EN (`/en`)
- [ ] Links no footer e nav funcionais
- [ ] Produtos sem URL usam `<span>` em vez de `<a>`

---

## 4. Formulário de Contacto

- [ ] Campos obrigatórios validam: Nome, Email, Assunto, Mensagem
- [ ] Mensagens de erro aparecem em PT/EN conforme idioma
- [ ] Botão de submit desativa durante envio
- [ ] Estado de sucesso/erro apresentado ao utilizador
- [ ] Endpoint `/api/contact` responde corretamente

---

## 5. Modal de Orçamento

- [ ] Abre ao clicar no card "Sites para Intermediários de Crédito"
- [ ] Fecha com ESC, clique fora e botão fechar
- [ ] CTA do modal navega para o formulário e pré-seleciona dropdown
- [ ] Linha animada visível à volta do modal

---

## 6. SEO e Meta

- [ ] `<title>` e `<description>` definidos para PT e EN
- [ ] `canonicalPath` correto em cada página
- [ ] `lang` correto no `<html>` (`pt` ou `en`)
- [ ] OG tags presentes (se configuradas)

---

## 7. Performance Visual

- [ ] Linha animada (`border-trace`) visível nos cards em hover
- [ ] Linha animada visível no painel do formulário
- [ ] Gradiente de texto (`.gradient-text`) a funcionar
- [ ] Animações não aparecem em elementos não intencionais

---

## 8. Responsivo

Testar nos seguintes breakpoints:
- [ ] Mobile: 375px
- [ ] Tablet: 768px
- [ ] Desktop: 1280px+

Secções a verificar: Hero, Projetos (grid), Contacto (2 colunas → 1), Footer, Nav (hamburguer mobile)

---

## 9. Páginas Legais

- [ ] `/termos` — conteúdo atualizado, links de produtos corretos
- [ ] `/privacidade` — conteúdo atualizado
- [ ] Links no footer apontam para `/termos` e `/privacidade`

---

## Comandos Úteis

```bash
pnpm build          # build de produção
pnpm preview        # preview do build
pnpm dev            # servidor de desenvolvimento (porta 4321)
```
