# /new-project-card — Adicionar Projeto ao Grid

## Objetivo
Guia rápido para adicionar um novo projeto ao grid da secção Projetos, escolhendo o estado correto.

---

## Tipos de Card

| Estado | Quando usar | Render |
|---|---|---|
| `link` | Projeto público com URL | `<a href>` — abre em nova aba |
| `modal` | Produto com popup de detalhes antes do CTA | `<div data-open-modal>` |
| `disabled` | Em breve / sem URL ainda | `<div>` sem interação |

---

## 1. Adicionar ao site.ts

Em `src/i18n/site.ts`, dentro de `projects.items` (PT e EN):

```ts
{
  name: "Nome Do Projeto",
  area: "Área / Categoria",
  description: "Descrição curta e clara do que faz.",
  tags: ["Tag1", "Tag2", "Tag3"],
  color: "cyan",        // cyan | violet | green | blue
  url: "https://...",   // omitir se disabled ou modal

  // Escolher apenas UM dos seguintes:
  // (nenhum)          → card com link direto
  modal: true,          // → abre popup
  disabled: true,       // → card inativo ("Em breve")

  // Opcional — sobrepõe o texto padrão do botão
  cta: "Brevemente",    // ex: "Brevemente" | "Coming Soon" | "Ver projeto"
},
```

---

## 2. Cores Disponíveis

```
cor-cyan   → #00d4ff  (destaque principal)
cor-violet → #7c3aed  (destaque secundário)
cor-green  → #10b981  (verde)
cor-blue   → #3b82f6  (azul)
```

Atribuir cores diferentes a cards adjacentes para criar contraste visual.

---

## 3. Se usar Modal (estado `modal: true`)

Há apenas **um modal** no componente (`sitesModal`). Se o novo projeto precisar de modal próprio, é necessário:

1. Criar novo objeto `novoModal` em `projects` no `site.ts`
2. Adicionar HTML do modal em `Projetos.astro`
3. Adicionar script de abertura/fecho
4. Adicionar CSS do modal em `global.css` seguindo o padrão `.sites-modal`

Se o projeto partilhar o mesmo modal (ex: todos os "sites IC"), não é necessário nada extra — basta `modal: true`.

---

## 4. Se usar Link (estado padrão)

Certificar que:
- [ ] `url` está preenchido e é um URL válido
- [ ] Link abre com `target="_blank" rel="noopener noreferrer"` (já configurado no componente)

---

## 5. Se usar Disabled

- [ ] Adicionar `disabled: true`
- [ ] Adicionar `cta: "Brevemente"` (PT) / `cta: "Coming Soon"` (EN)
- [ ] Não incluir `url`

---

## Checklist

- [ ] Item adicionado em PT e EN com as mesmas chaves
- [ ] Cor escolhida e diferente do card adjacente
- [ ] Estado correto: link / modal / disabled
- [ ] `cta` personalizado se necessário
- [ ] Grid testado visualmente (não quebra layout)
