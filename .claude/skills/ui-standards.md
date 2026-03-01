# /ui-standards — UI & Padronização do Projeto

## Objetivo
Garantir que qualquer novo componente, secção ou alteração visual segue as convenções de design e código estabelecidas no projeto **Além do Código**.

---

## Tokens de Design (CSS Variables)

```css
/* Cores */
--clr-bg:       #05050f       /* fundo global */
--clr-surface:  #0d0d1f       /* cards, painéis */
--clr-border:   rgba(255,255,255,0.06)
--clr-text:     #e2e8f0
--clr-muted:    #94a3b8
--clr-cyan:     #00d4ff       /* cor de destaque principal */
--clr-violet:   #7c3aed       /* cor de destaque secundária */

/* Layout */
--radius: 16px
--trans:  0.2s ease

/* Container: max-width 1200px, padding 0 24px */
```

**Regra:** Nunca usar cores ou valores de espaçamento hardcoded. Usar sempre variáveis CSS ou valores relativos (rem/clamp).

---

## Estrutura de Secção

Todas as secções seguem este padrão:

```astro
<section class="section [section-alt]" id="id-da-seccao">
  <div class="container">
    <div class="section-header">
      <div class="section-tag">Etiqueta</div>
      <h2 class="section-title">Texto base <span class="gradient-text">Destaque</span></h2>
      <p class="section-sub">Subtítulo descritivo</p>
    </div>
    <!-- conteúdo -->
  </div>
</section>
```

- `.section` → fundo `--clr-bg`
- `.section-alt` → fundo ligeiramente diferente para alternância visual
- `.gradient-text` → gradiente cyan → violet no texto de destaque
- Títulos em **Title Case** (cada palavra começa com maiúscula)

---

## Tipografia

```css
/* Títulos de secção */
font-size: clamp(2rem, 4vw, 2.8rem);
font-weight: 800;
letter-spacing: -0.02em;

/* Subtítulos */
font-size: clamp(1rem, 2vw, 1.15rem);

/* Labels (form, tags) */
font-size: 0.78rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
```

---

## Cards e Painéis

```css
/* Base de qualquer card/painel */
background: var(--clr-surface);
border: 1px solid var(--clr-border);
border-radius: var(--radius);
position: relative;
overflow: hidden;   /* OBRIGATÓRIO para a linha animada */
```

### Linha Animada (Animated Border)

Todos os elementos premium (cards em hover, modal aberto, painel de formulário) usam este padrão:

```css
.elemento::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;                /* espessura da linha */
  background: conic-gradient(
    from var(--border-angle),
    transparent 0%,
    transparent 80%,
    var(--clr-violet) 88%,
    var(--clr-cyan) 95%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask:         linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: border-trace 3s linear infinite;
  pointer-events: none;
  z-index: 0;
}
/* Conteúdo do card deve ter position: relative; z-index: 1 */
```

**Velocidades:**
- Cards de projeto (hover): `4s` — começa `paused`, passa a `running` no `:hover`
- Modal e form panel (sempre ativo): `3s`

---

## Componentes Existentes

| Componente | Ficheiro | Notas |
|---|---|---|
| Navegação | `Nav.astro` | Desktop + mobile, lang switcher PT/EN |
| Hero | `Hero.astro` | Secção de topo com CTA |
| Sobre | `Sobre.astro` | Secção sobre a empresa |
| Projetos | `Projetos.astro` | Cards com 3 estados: `disabled`, `modal`, `link` |
| Modal de Orçamento | `Projetos.astro` | Popup com features + CTA para o formulário |
| Contacto | `Contacto.astro` | Terminal panel + formulário com validação |
| Footer | `Footer.astro` | Links, legal, copyright |

---

## Formulários

- Campos obrigatórios: **Nome**, **Email**, **Assunto**, **Mensagem**
- Campos opcionais: Empresa, Contacto (telefone)
- Validação: customizada via JS no submit (`novalidate` no form)
- Erros: `.cf-error` (vermelho `#f87171`) + `.cf-group.has-error` (borda vermelha)
- Sem `box-shadow` nos inputs em foco — apenas mudança de `border-color`

---

## Animações Globais

```css
@property --border-angle { ... }      /* Houdini — já declarado em global.css */
@keyframes border-trace { to { --border-angle: 360deg; } }
```

Não redeclarar. Reutilizar diretamente via `::after` nos novos componentes.

---

## i18n

- Toda a cópia de UI vive em `src/i18n/site.ts`
- Idiomas suportados: **PT** e **EN**
- Componentes recebem textos via props — nunca hardcode
- Ver skill `/i18n-sync` para workflow completo

---

## Checklist ao Criar/Alterar Componente

- [ ] Usa variáveis CSS (não hardcode de cores/espaçamentos)
- [ ] Título em Title Case se for heading de secção
- [ ] Card/painel tem `position: relative; overflow: hidden`
- [ ] Se tiver linha animada: conteúdo com `z-index: 1`
- [ ] Textos adicionados ao `site.ts` em PT e EN
- [ ] Sem TypeScript no script `define:vars` (usa JS puro)
- [ ] Responsivo verificado (mobile-first)
