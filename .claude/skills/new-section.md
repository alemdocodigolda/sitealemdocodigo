# /new-section — Criar Nova Secção

## Objetivo
Guia passo a passo para adicionar uma nova secção ao site, garantindo consistência com os padrões do projeto.

---

## 1. Criar o Componente

Criar ficheiro em `src/components/NomeSeccao.astro`:

```astro
---
interface Props {
  sectionData: any;
}
const { sectionData } = Astro.props;
---

<section class="section [section-alt]" id="id-da-seccao">
  <div class="container">
    <div class="section-header">
      <div class="section-tag">{sectionData.tag}</div>
      <h2 class="section-title">
        {sectionData.titleBefore} <span class="gradient-text">{sectionData.titleHighlight}</span>
      </h2>
      <p class="section-sub">{sectionData.subtitle}</p>
    </div>

    <!-- conteúdo da secção -->

  </div>
</section>
```

**Regras:**
- ID da secção em minúsculas, sem espaços (ex: `id="servicos"`)
- Alternar `.section` e `.section-alt` para criar ritmo visual entre secções
- Título sempre em **Title Case**

---

## 2. Adicionar Textos ao site.ts

Em `src/i18n/site.ts`, adicionar à interface e aos dados PT/EN:

```ts
// Interface
nomeSeccao: {
  tag: string;
  titleBefore: string;
  titleHighlight: string;
  subtitle: string;
};

// Dados PT
nomeSeccao: {
  tag: "Etiqueta",
  titleBefore: "Título Em Title",
  titleHighlight: "Case",
  subtitle: "Subtítulo descritivo.",
},

// Dados EN
nomeSeccao: {
  tag: "Tag",
  titleBefore: "Title In Title",
  titleHighlight: "Case",
  subtitle: "Descriptive subtitle.",
},
```

---

## 3. Importar na Página

Em `src/pages/index.astro`:

```astro
---
import NomeSeccao from "../components/NomeSeccao.astro";
const { nomeSeccao } = content;
---

<NomeSeccao sectionData={nomeSeccao} />
```

---

## 4. CSS

Estilos específicos da secção vão para o final de `src/styles/global.css`, com comentário:

```css
/* ============================================================
   NOME SECÇÃO
   ============================================================ */
```

Nunca criar ficheiro CSS separado — tudo em `global.css`.

---

## Checklist Final

- [ ] Componente criado em `src/components/`
- [ ] Textos adicionados a `site.ts` em PT e EN
- [ ] Componente importado na página
- [ ] Secção tem `id` para anchor links
- [ ] CSS em `global.css` com comentário de secção
- [ ] Responsivo testado (mobile ≤ 768px)
- [ ] Sem texto hardcoded fora do `site.ts`
