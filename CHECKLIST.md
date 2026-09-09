# CHECKLIST — Portfólio João Pedro Borges

Documento de implementação completa do site de portfólio.  
**Idioma do site e deste checklist:** pt-BR (conteúdo do site também em `en` via i18n).  
**Escopo desta entrega:** especificação e checklist — não é o código do site.  
**Meta da v1:** site completo de uma vez (conteúdo, motion, 3D, SEO/IA, deploy). As fases abaixo são ordem de execução, não cortes de escopo.

---

## 0. Decisões fechadas (não reabrir)

| Tema | Decisão |
|------|---------|
| Nome exibido | João Pedro Borges |
| Posicionamento | Foco técnico (backend NestJS / Node.js / TypeScript) |
| Framework | Astro (SSG) + React islands + TypeScript |
| Estilo | Tailwind CSS; minimal editorial + glassmorphism |
| Tema | Claro (default) + escuro |
| UI | Radix UI puro |
| Ícones | Lucide React (stroke custom) + Simple Icons |
| Motion | Lenis + Motion + GSAP ScrollTrigger + R3F/Three (hero) |
| Forms | React Hook Form + Zod → apenas `mailto:` |
| i18n | pt-BR + en na v1 |
| Host / URL | Vercel → `joaoborges-dev.vercel.app` |
| Analytics | Umami Cloud (plano gratuito) |
| A11y | WCAG AA |
| PWA | Não |
| Testes automatizados | Não |
| Blog | Apenas preparação estrutural/SEO para depois |
| Navegação | Landing contínua (timeline fluida) + rotas/hashes → seções |
| Contato | Dados fixos + formulário + links |
| CTAs | Fale comigo / Ver projetos / Baixar CV / Agendar conversa |
| Disponibilidade | CLT e freelance visíveis |
| Mídia | Placeholders até assets reais |
| Easter eggs | Vários e criativos (curadoria posterior) |

### Regra crítica de animação

- **Nunca** animar o mesmo nó DOM com Motion e GSAP ao mesmo tempo.
- GSAP + ScrollTrigger: ownership do scroll/timeline de seções.
- Motion: hover, focus, microinterações, mount/unmount de islands isoladas.
- R3F: isolado no canvas do hero; não disputar transform CSS do mesmo elemento.

### Regra crítica de 3D

- Converter modelos com **gltfjsx**.
- Texturas **WebP** ou **KTX2**.
- Lazy load da island; fallback estático se WebGL indisponível.
- Dispose de geometrias/materiais/textures no unmount.

---

## 1. Conteúdo canônico

Fonte: `Profile.pdf` (LinkedIn) + respostas de decisão. Todo copy do site deve ser consistente com esta matriz.

### 1.1 Identidade

| Campo | Valor |
|-------|--------|
| Nome completo (SEO / JSON-LD) | João Pedro Borges Araújo |
| Nome de marca (UI) | João Pedro Borges |
| Headline técnica | Software Engineer · NestJS · Node.js · JavaScript · TypeScript · TypeORM · Sequelize · MySQL · Firebird · RabbitMQ |
| Localização | Franca, São Paulo, Brasil |
| Idade (Sobre) | **Não exibir** |
| Início da experiência | maio de 2023 (âncora canônica) |
| Tempo de experiência (UI) | **Dinâmico** a partir de `2023-05-01` (ex.: “X anos e Y meses”) + menção estática “desde maio de 2023” no HTML/SEO/`llms.txt` |
| Especialidade | Backend com JavaScript/Node.js; soluções robustas e escaláveis |

### 1.2 Contato e redes

| Canal | Valor | Uso no site |
|-------|--------|-------------|
| E-mail | `joaoofficialpedro@gmail.com` | Texto + `mailto:` do form |
| Telefone / WhatsApp | `+55 16 99379-1185` / `+5516993791185` | Link `https://wa.me/5516993791185` |
| LinkedIn | `https://www.linkedin.com/in/joaop06` | Footer / Contato / JSON-LD |
| GitHub | `https://github.com/joaop06` | Footer / Contato / Projetos |
| Instagram | `@ojoaoborges_` → `https://www.instagram.com/ojoaoborges_/` | Contato / Footer |
| Portfólio legado (referência) | `https://jcoder.com.br/joaop06` | Não é URL canônica do novo site |

### 1.3 Resumo (Sobre) — base pt-BR

Texto-base (adaptar levemente para tom editorial, mantendo fatos). A duração “X anos e Y meses” deve ser **calculada no build ou no client** a partir de maio/2023; no markdown SEO usar a âncora fixa “desde maio de 2023”.

> Trabalho como programador desde maio de 2023 ({duracaoDinamica} de experiência). Minha especialidade é backend com JavaScript (Node.js), com desenvolvimento e manutenção de soluções robustas e escaláveis. Sou formado em Desenvolvimento de Software Multiplataforma pela Fatec Franca Dr. Thomaz Novelino, com 2640 horas de curso, incluindo estágio e atividades de extensão. Sempre em busca de novos desafios e oportunidades de crescimento profissional.

Disponibilidade (obrigatório na UI): aberto a **CLT** e **freelance**.

**Regra D4 (tempo dinâmico):** preferir duração dinâmica na UI para não envelhecer; manter “desde maio de 2023” no HTML estático, JSON-LD/`knowsAbout` contextual e espelhos markdown. Não exibir idade.

### 1.4 Stack / competências

**Principais (destaque):** NestJS, Node.js, TypeORM.

**Lista completa a exibir:**

- Node.js
- JavaScript / TypeScript
- NestJS
- TypeORM / Sequelize
- MySQL / Firebird / PostgreSQL
- Docker
- RabbitMQ
- React / React Native
- Vue.js
- Flutter
- Python

Agrupar na UI por categorias (ex.: Backend, Dados & Mensageria, Frontend & Mobile, Infra & Ferramentas) sem inventar competências fora desta lista.

### 1.5 Experiência

#### Deltatec — Assistência Técnica (empregador único, 5 anos 8 meses no total LinkedIn)

**Back End Developer** — junho de 2023 – Presente · Franca, SP

- Desenvolvimento do sistema interno de logística e gestão.
- Stack: Node.js, TypeScript, NestJS.
- Integrações com e-commerce **Tray** e ERP **Onclick**.
- Gerenciamento de servidores e bancos de dados: MySQL, Firebird e PostgreSQL.

**Atendimento ao cliente** — fevereiro de 2021 – junho de 2023 · Franca, SP

- **Não exibir** endereço da empresa (D3).
- Tratar como cargo anterior na mesma empresa, **sem ênfase** em engenharia de software.
- Na timeline visual: peso visual menor que o cargo de Back End.

### 1.6 Formação acadêmica

| Instituição | Curso / nível | Período |
|------------|---------------|---------|
| Fatec Franca — Faculdade de Tecnologia “Dr. Thomaz Novelino” | Tecnólogo em Desenvolvimento de Software Multiplataforma (DSM) | agosto de 2022 – junho de 2025 |
| ETEC Dr. Júlio Cardoso | Ensino médio | 2018 – 2020 |

Nota: no PDF a ETEC aparece triplicada sem nome de curso — no site usar **apenas uma entrada** “Ensino médio”.

### 1.7 Certificações

| Nome | Tipo | Emissão | Credencial |
|------|------|---------|------------|
| Front-End Básico | Micro-certificado do curso DSM | janeiro de 2024 | `843f992d-f93a-4ad7-bd89-17ae700bb524` |
| Tecnólogo em Desenvolvimento de Software Multiplataforma | Formação / certificação de conclusão (alinhado ao PDF) | Conforme diploma Fatec | Exibir junto à formação |

Exibir código da credencial Front-End Básico de forma copiável (botão “copiar”).

### 1.8 Projetos e open source

| Nome | Tipo | URL | Descrição pt-BR (canônica) | Stack (v1; refinar se o autor confirmar) |
|------|------|-----|----------------------------|------------------------------------------|
| Imobil — Gestão Imobiliária | Produto / web | https://imobil.app.br | Plataforma de gestão imobiliária. | Web app (stack a espelhar do produto público; não inventar libs não usadas) |
| Site apresentativo Grupo Fênix | Site | https://grupofenix.vercel.app | Site institucional/apresentativo do Grupo Fênix. | Front-end estático/SPA em Vercel |
| Catálogo Mep Decor | Catálogo | https://mepdecor.vercel.app | Catálogo digital Mep Decor. | Front-end em Vercel |
| Catálogo Pé Quente | Catálogo | https://pequentebarretos.vercel.app | Catálogo digital Pé Quente. | Front-end em Vercel |
| language-interpreter | Pacote NPM | https://www.npmjs.com/package/language-interpreter | Pacote NPM para interpretação de linguagem. | JavaScript/TypeScript (NPM) |

Cada item: link externo, imagem placeholder, `CreativeWork` no JSON-LD, descrição EN = tradução fiel da coluna pt-BR. Na implementação, preencher badges de stack só com o que for verificável no repo/npm/site; se incerto, omitir badge específico e manter a descrição.

### 1.9 CTAs e CV

- **Fale comigo** → `#contato` (seção Contato; form + dados fixos)
- **Ver projetos** → `#projetos`
- **Baixar CV** → arquivo em `/cv/joao-pedro-borges.pdf` (placeholder na Fase 0; PDF real depois)
- **Agendar conversa** → **WhatsApp como principal**, sempre redirecionando (`https://wa.me/5516993791185` + texto pré-preenchido pt/en). A seção Contato permanece no fluxo da timeline; CTAs de agendamento **não** ficam só no form — abrem WhatsApp.

### 1.10 Matriz PDF ↔ seções do site

| Dado do currículo | Seção do site | Observação |
|-------------------|---------------|------------|
| Nome / headline / local | Hero | Headline técnica |
| Resumo + experiência desde mai/2023 + Fatec 2640h | Sobre | Sem idade; duração dinâmica + disponibilidade CLT/freelance |
| Principais competências + lista | Stack | Agrupada |
| Deltatec Back End + detalhes | Experiências | Primária |
| Deltatec Atendimento | Experiências | Secundária / breve |
| Fatec + ETEC | Formação / Certificações | ETEC = ensino médio (1x) |
| Front-End Básico + Tecnólogo | Formação / Certificações | Credencial UUID |
| Contatos / redes | Contato + Footer | Fixos + form |
| Projetos (respostas) | Projetos | 5 itens |
| — | Timeline fluida | Conceito visual de todo o scroll |

---

## 2. Stack técnica alvo

Versões: fixar as estáveis mais recentes no momento do scaffold; registrar no `package.json` e neste checklist após install.

| Camada | Biblioteca | Papel |
|--------|------------|--------|
| Meta-framework | `astro` | SSG, rotas, islands |
| UI islands | `react`, `react-dom`, `@astrojs/react` | Componentes interativos |
| Linguagem | TypeScript | Obrigatório |
| CSS | `tailwindcss`, `@astrojs/tailwind` (ou integração oficial vigente) | Utilitários + design tokens |
| Motion micro | `motion` (ex-Framer Motion) | Hover/focus/micro |
| Scroll | `lenis` | Smooth scroll base |
| Timeline scroll | `gsap` + ScrollTrigger | Timeline de seções |
| 3D | `@react-three/fiber`, `@react-three/drei`, `three` | Hero 3D |
| UI primitives | Radix (`@radix-ui/react-*` conforme necessidade) | A11y de diálogos, etc. |
| Forms | `react-hook-form`, `@hookform/resolvers`, `zod` | Contato → mailto |
| Ícones | `lucide-react`, `simple-icons` (ou componente wrapper) | UI + logos de tech |
| i18n | Rotas `/pt`, `/en` + dicionários JSON/TS | Conteúdo bilíngue |
| Analytics | Script Umami Cloud | Privacy-friendly |
| Deploy | Vercel | `joaoborges-dev.vercel.app` |

**Não incluir:** PWA, suite de testes (Vitest/Playwright/Cypress), backend de formulário.

---

## 3. Sistema visual proposto

Direção: **minimal editorial + glassmorphism**, fundo claro default, sem clichês purple-on-white, cream+terracotta ou broadsheet denso.

### 3.1 Tipografia (D1 fechado)

| Papel | Família | Fallback | Uso |
|-------|---------|----------|-----|
| Display / títulos | **Satoshi** (Fontshare) | `system-ui, sans-serif` | Nome no hero, títulos de seção, nav |
| Body | **General Sans** (Fontshare) | `system-ui, sans-serif` | Parágrafos, formulário, UI corrida |
| Mono / tech | **IBM Plex Mono** | `ui-monospace, monospace` | Credenciais, código, badges de stack |

Carregar com `font-display: swap`; subset latim; no máximo 2 pesos por família (ex.: 500/700 Satoshi, 400/500 General Sans).

### 3.2 Tokens de cor (CSS variables)

```css
:root {
  /* Light (default) */
  --bg: #f7f6f3;
  --bg-elevated: rgba(255, 255, 255, 0.55);
  --fg: #141414;
  --fg-muted: #5c5c5c;
  --accent: #0f4c5c;        /* teal profundo — técnico, não purple */
  --accent-soft: #e6f0f2;
  --border-glass: rgba(20, 20, 20, 0.08);
  --glow: rgba(15, 76, 92, 0.12);
  --danger: #9b2c2c;
  --success: #1b5e3b;
}

[data-theme="dark"] {
  --bg: #0e1113;
  --bg-elevated: rgba(24, 28, 32, 0.55);
  --fg: #f2f2f0;
  --fg-muted: #a3a3a3;
  --accent: #5eb3c2;
  --accent-soft: #143038;
  --border-glass: rgba(255, 255, 255, 0.1);
  --glow: rgba(94, 179, 194, 0.15);
}
```

### 3.3 Glass

- `background: var(--bg-elevated)`
- `backdrop-filter: blur(16px) saturate(140%)`
- `border: 1px solid var(--border-glass)`
- `border-radius: 1rem` (evitar `rounded-full` em tudo)
- Sombras: uma camada suave (`0 8px 32px var(--glow)`), sem multi-layer exagerado

### 3.4 Espaçamento e layout

- Container: `max-width: 1120px`; padding lateral `1.25rem` → `2rem`
- Ritmo vertical de seções: `min-height` generoso (≈ 85–100vh em desktop para sensação de “capítulos” da timeline)
- Grid tipográfico: títulos com tracking leve negativo no display; body `line-height: 1.6`

### 3.5 Motion tokens

| Token | Valor |
|-------|--------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--dur-fast` | `150ms` |
| `--dur-mid` | `320ms` |
| `--dur-slow` | `700ms` |
| Lenis | `lerp` ~0.08–0.1; sync com ScrollTrigger via `scrollerProxy` ou API Lenis oficial |
| `prefers-reduced-motion: reduce` | Desligar Lenis smooth, GSAP complexo e 3D; manter fades mínimos ou estático |

### 3.6 Contraste WCAG AA

- Texto normal ≥ 4.5:1 contra `--bg`
- Texto grande (≥18pt/14pt bold) ≥ 3:1
- Foco visível: anel `2px` `--accent` + offset
- Não depender só de cor para estado (ícone + texto)

---

## 4. Arquitetura de informação e rotas

### 4.1 Seções (ordem da timeline)

1. **Hero** (`#inicio`)
2. **Sobre** (`#sobre`)
3. **Formação / Certificações** (`#formacao`)
4. **Stack** (`#stack`)
5. **Experiências** (`#experiencia`)
6. **Projetos** (`#projetos`)
7. **Contato** (`#contato`)

O site inteiro deve **parecer uma timeline contínua**: linha/guia visual lateral ou central, progress indicator, e scroll GSAP amarrando capítulos — não cards soltos desconectados.

### 4.2 Rotas Astro

| Rota | Comportamento |
|------|----------------|
| `/` | Redirect para `/pt` (ou locale preferido) |
| `/pt`, `/en` | Landing completa |
| `/pt/sobre`, `/en/about` (etc.) | Redirect 301/302 ou meta-refresh interno → `/pt#sobre` (e equivalentes EN) |
| `/pt/cv` | Redirect para PDF ou página de download |

Hashes e paths de seção devem sincronizar (deep link abre na seção correta após Lenis ready).

### 4.3 i18n

- Dicionários: `src/i18n/pt.ts`, `src/i18n/en.ts` (ou JSON)
- Chaves por seção; **nenhum** string de UI hardcodada fora dos dicionários
- `hreflang` + `alternates` no `<head>`
- Seletor de idioma no header (Radix Dropdown se necessário)

### 4.4 Estrutura de pastas esperada

```text
/
├── CHECKLIST.md
├── package.json
├── astro.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt
│   ├── og-default.png          # placeholder
│   ├── cv/joao-pedro-borges.pdf
│   └── models/hero.glb         # otimizado
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── pt/index.astro
│   │   ├── en/index.astro
│   │   └── ... redirects de seção
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── sections/…          # Astro ou React
│   │   ├── ui/…                # Radix wrappers
│   │   ├── three/HeroScene.tsx
│   │   ├── motion/…
│   │   └── forms/ContactForm.tsx
│   ├── content/mirror/         # markdown espelho para IA
│   ├── i18n/
│   ├── styles/global.css
│   ├── lib/seo.ts
│   └── data/projects.ts
└── vercel.json
```

---

## 5. Fases de implementação

---

### Fase 0 — Fundação do projeto

**Objetivo:** repositório buildável, tipado, com i18n e deploy stub na Vercel.

**Pré-requisitos:** Node LTS, conta Vercel, domínio/projeto `joaoborges-dev`.

#### Tasks

- [x] **F0.1** Scaffold Astro com TypeScript + integração React + Tailwind.
- [x] **F0.2** Configurar ESLint + Prettier (Astro/React/TS) e scripts `dev`, `build`, `preview`.
- [x] **F0.3** Criar árvore `src/` conforme §4.4.
- [x] **F0.4** Rotas `/`, `/pt`, `/en` (home bilíngue mínima “Hello”).
- [x] **F0.5** `public/robots.txt` (Allow / + sitemap URL), favicon SVG placeholder.
- [x] **F0.6** `public/cv/joao-pedro-borges.pdf` placeholder (mesmo que 1 página “CV em breve”).
- [x] **F0.7** Variáveis de ambiente documentadas: `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_UMAMI_SRC`, `PUBLIC_SITE_URL=https://joaoborges-dev.vercel.app`.
- [x] **F0.8** `vercel.json` (headers de segurança básicos: `X-Content-Type-Options`, `Referrer-Policy`; trailing slash consistente).
- [ ] **F0.9** Deploy inicial na Vercel apontando para `joaoborges-dev.vercel.app`.
- [x] **F0.10** README curto: como rodar local e variáveis (sem substituir este CHECKLIST).

#### Critérios de aceite

- `npm run build` sem erros.
- `/pt` e `/en` respondem 200 no preview.
- URL Vercel acessível em HTTPS.

#### Done

- [ ] Fase 0 concluída

---

### Fase 1 — Design system e shell

**Objetivo:** tokens, temas, layout, navegação de âncoras/rotas, a11y base, placeholders de mídia.

**Pré-requisitos:** Fase 0.

#### Tasks

- [x] **F1.1** Implementar CSS variables §3.2 em `global.css` + mapear no Tailwind (`theme.extend.colors`).
- [x] **F1.2** Carregar fontes §3.1 (self-host ou Google/Fontshare com preconnect).
- [x] **F1.3** Utilitários glass (classe `.glass`).
- [x] **F1.4** Toggle tema claro/escuro (`data-theme`); default **claro**; persistir em `localStorage`; respeitar `prefers-color-scheme` só na primeira visita se não houver preferência salva.
- [x] **F1.5** `BaseLayout.astro`: skip-link “Ir para o conteúdo”, `header`, `main`, `footer`, landmark roles.
- [x] **F1.6** Nav com links para todas as seções; em mobile: Radix Dialog ou Visually hidden menu acessível.
- [x] **F1.7** Rotas de redirecionamento de seção (`/pt/projetos` → `/pt#projetos`, espelho EN).
- [x] **F1.8** Placeholders: avatar (SVG geométrico), OG image, thumbs de projetos (ratio 16:10).
- [x] **F1.9** Componentes UI base Radix conforme necessidade imediata (ex.: `DropdownMenu` idioma, `Dialog` mobile nav) — wrappers em `src/components/ui/`.
- [x] **F1.10** Lucide com `strokeWidth` custom (ex.: 1.5) global via wrapper `<Icon />`.
- [x] **F1.11** Simple Icons para logos da stack (Nest, Node, TS, Docker, etc.).
- [x] **F1.12** Foco visível e ordem de tab lógica no shell.

#### Critérios de aceite

- Troca de tema sem flash incorreto grave (script inline anti-FOUC no `<head>`).
- Navegação por teclado completa no header.
- Contraste AA nos tokens light e dark (amostrar texto/accent).

#### Done

- [x] Fase 1 concluída

---

### Fase 2 — Conteúdo e seções (pt + en)

**Objetivo:** todas as seções com copy fiel ao §1, bilíngue, CTAs e formulário mailto.

**Pré-requisitos:** Fase 1.

#### Tasks — Hero

- [x] **F2.1** Marca/nome como sinal hero-level: **João Pedro Borges**.
- [x] **F2.2** Headline técnica (não overpower a marca tipograficamente — marca maior ou igual).
- [x] **F2.3** Uma frase de apoio (especialidade backend Nest/Node).
- [x] **F2.4** Grupo de CTAs: Fale comigo, Ver projetos, Baixar CV, Agendar conversa.
- [x] **F2.5** Slot reservado para canvas 3D (Fase 4); placeholder visual até lá.
- [x] **F2.6** Local: Franca, São Paulo, Brasil.

#### Tasks — Sobre

- [x] **F2.7** Texto §1.3 em pt + en (duração dinâmica + “desde maio de 2023”; **sem idade**).
- [x] **F2.8** Badge/linha de disponibilidade CLT + freelance.
- [x] **F2.9** Placeholder de foto profissional.

#### Tasks — Formação / Certificações

- [x] **F2.10** Fatec DSM (ago/2022–jun/2025) + menção 2640 horas.
- [x] **F2.11** ETEC ensino médio (2018–2020) — uma entrada.
- [x] **F2.12** Certificação Front-End Básico (jan/2024) + UUID copiável.
- [x] **F2.13** Tecnólogo DSM listado de forma coerente com formação.

#### Tasks — Stack

- [x] **F2.14** Grid/lista categorizado com Simple Icons + labels.
- [x] **F2.15** Destaque visual NestJS, Node.js, TypeORM.

#### Tasks — Experiências

- [x] **F2.16** Deltatec Back End: bullets §1.5 (logística, Tray, Onclick, DBs, Nest/TS).
- [x] **F2.17** Atendimento ao cliente: bloco breve/secundário.
- [x] **F2.18** Datas e local em formato localizado (pt/en).

#### Tasks — Projetos

- [x] **F2.19** Cards/linhas para os 5 itens §1.8 (não usar “card” decorativo se não ajudar interação — preferir lista editorial com glass só onde houver hover/link).
- [x] **F2.20** Links externos `rel="noopener noreferrer"`.
- [x] **F2.21** Descrições curtas pt/en (sem inventar métricas falsas).

#### Tasks — Contato

- [x] **F2.22** Exibir e-mail, WhatsApp, Instagram, LinkedIn, GitHub.
- [x] **F2.23** Form React island: React Hook Form + Zod (nome, e-mail, mensagem; opcional assunto).
- [x] **F2.24** Submit gera `mailto:joaoofficialpedro@gmail.com?subject=...&body=...` (encodeURIComponent); feedback de UI se o cliente de e-mail não abrir.
- [x] **F2.25** CTA **Agendar conversa** → WhatsApp sempre (`wa.me` + texto pré-preenchido pt/en). “Fale comigo” → `#contato`.

#### Tasks — Footer / CV

- [x] **F2.26** Footer com copyright, redes, seletor idioma, link CV.
- [x] **F2.27** Download CV funcional (mesmo placeholder).

#### Critérios de aceite

- Paridade de conteúdo pt ↔ en (nenhuma seção vazia em um idioma).
- Todos os links de projetos e redes abrem corretamente.
- Form valida campos obrigatórios antes do mailto.
- Nenhuma informação contradizendo o PDF/respostas.

#### Done

- [x] Fase 2 concluída

---

### Fase 3 — Timeline fluida e motion

**Objetivo:** scroll contínuo tipo timeline; Lenis + GSAP; Motion só em micro; easter eggs.

**Pré-requisitos:** Fase 2 (seções com `id` estáveis).

#### Tasks — Fundação scroll

- [x] **F3.1** Inicializar Lenis no layout client island (`client:load` mínimo necessário).
- [x] **F3.2** Integrar Lenis ↔ GSAP ScrollTrigger (atualizar ScrollTrigger no `lenis.on('scroll')`; `ScrollTrigger.refresh` após fontes/imagens).
- [x] **F3.3** Guia visual de timeline (linha + marcadores por seção) sincronizada ao scroll.
- [x] **F3.4** Indicador de progresso (ex.: barra ou ponto ativo no nav).
- [x] **F3.5** Entrada de capítulos via GSAP (opacity/y ou clip) — **sem** Motion no mesmo elemento.
- [x] **F3.6** Deep link `#secao`: após load, scroll Lenis até o alvo sem “pulo” feio.

#### Tasks — Motion (micro)

- [x] **F3.7** Hover em links/CTAs/projetos com Motion (escala/opacity sutis).
- [x] **F3.8** Toggle tema e seletor idioma com microfeedback Motion.
- [x] **F3.9** Documentar mapa “elemento → owner” (GSAP | Motion | CSS) em comentário ou `docs/motion-ownership.md` interno (pode ser seção anexa no repo depois; no mínimo comentários no código).

#### Tasks — Reduced motion

- [x] **F3.10** Se `prefers-reduced-motion: reduce`: desabilitar Lenis smooth e timelines GSAP; seções estáticas; micro Motion off.

#### Tasks — Easter eggs (implementar vários; curadoria depois)

- [x] **F3.11** Konami code → mensagem/tema temporário ou trilha visual discreta.
- [x] **F3.12** Clique repetido no nome (N vezes) → terminal ASCII mínimo com bio one-liner.
- [x] **F3.13** Atalho teclado `?` → overlay de atalhos (a11y: focável, Esc fecha, Radix Dialog).
- [x] **F3.14** Hover longo no logo Nest da stack → tooltip “favorite stack” animado.
- [x] **F3.15** Console `console.log` estilizado de boas-vindas a recrutadores/devs.
- [x] **F3.16** Hash secreto `#matrix` ou `#coffee` → easter visual leve (sem derrubar perf).
- [x] **F3.17** Lista no README ou comentário `EASTER_EGGS` para o autor desligar/deixar mais discreto depois.

#### Critérios de aceite

- Scroll 60fps em desktop mid-range; sem luta Motion×GSAP no mesmo nó.
- Timeline perceptível como narrativa contínua.
- Reduced motion testado manualmente.
- Easter eggs não bloqueiam uso normal nem SEO (conteúdo principal no HTML estático).

#### Done

- [x] Fase 3 concluída

---

### Fase 4 — Hero 3D (R3F)

**Objetivo:** elemento 3D interativo no hero, otimizado e resiliente.

**Pré-requisitos:** Fase 1 slot hero; preferencialmente Fase 3 Lenis estável.

#### Tasks

- [x] **F4.1** Implementar cena procedural **Órbita de Integrações** (§7.1) — primitivos R3F, sem depender de GLB na v1.
- [x] **F4.2** Se no futuro houver GLB: pipeline compressão + **gltfjsx** (P8). Na v1, pular GLB.
- [x] **F4.3** Materiais glass/`MeshTransmission` ou physical alinhados ao tema; evitar texturas PNG pesadas.
- [x] **F4.4** Island `HeroScene.tsx` com `client:visible` (ou `client:idle`).
- [x] **F4.5** Dynamic import de `three` / R3F para não inflar o bundle inicial.
- [x] **F4.6** Limitar DPR (`dpr={[1, 1.5]}`), pausar render quando offscreen (`IntersectionObserver` ou `frameloop="demand"` + invalidate).
- [x] **F4.7** Interação: pointer suave (rotation) sem scrolljacking.
- [x] **F4.8** Fallback: imagem/SVG estático se WebGL falhar ou reduced motion.
- [x] **F4.9** Dispose no unmount; sem leaks em Strict Mode.
- [x] **F4.10** Budget: shaders/geometria leves; se houver assets, **< 1.5 MB** total transfer.

#### Critérios de aceite

- Lighthouse não colapsa por causa do 3D (ver Fase 5); TTI aceitável com lazy.
- Hero continua legível (marca + CTAs) com ou sem WebGL.
- Sem animar o wrapper DOM do canvas com GSAP e Motion de forma conflitante (mover só a cena Three ou um wrapper exclusivo CSS).

#### Done

- [x] Fase 4 concluída

---

### Fase 5 — Performance de bundle e runtime

**Objetivo:** site rápido, sem travamentos, bundle otimizado.

**Pré-requisitos:** Fases 2–4 integradas.

#### Tasks

- [x] **F5.1** Auditar islands: preferir `client:visible` / `client:idle` / `client:load` só onde inevitável (tema anti-FOUC pode ser script mínimo inline).
- [x] **F5.2** Importar plugins GSAP de forma tree-shakeable; registrar ScrollTrigger uma vez.
- [x] **F5.3** Não importar R3F no caminho crítico das demais seções.
- [x] **F5.4** Imagens via Astro `<Image>` / assets otimizados; width/height explícitos (CLS).
- [x] **F5.5** Fontes: subset + preload apenas pesos críticos.
- [x] **F5.6** Dividir CSS; evitar jumbos de utilitários não usados (Purge/content paths corretos).
- [x] **F5.7** Medir com Lighthouse (mobile + desktop) em build de produção.
- [x] **F5.8** Targets: **Performance ≥ 90**, **Accessibility ≥ 95**, **Best Practices ≥ 95**, **SEO ≥ 95**.
- [x] **F5.9** Verificar ausência de layout thrashing no scroll (timeline).
- [x] **F5.10** Bundle visualizer opcional (`rollup-plugin-visualizer`) para caçar outliers.
- [x] **F5.11** Prefetch de rotas de idioma conforme padrão Astro.

#### Critérios de aceite

- Metas Lighthouse §F5.8 atingidas no URL de produção ou preview de prod.
- Sem jank óbvio ao percorrer toda a timeline em notebook e mobile médio.
- First load sem baixar Three até aproximar do hero (Network panel).

#### Done

- [x] Fase 5 concluída

---

### Fase 6 — SEO clássico + descoberta por IA (prioridade máxima)

**Objetivo:** ser encontrado por buscadores e agentes de IA com facilidade.

**Pré-requisitos:** Conteúdo estável (Fase 2).

#### Tasks — SEO clássico

- [x] **F6.1** `<title>` e meta description únicos por locale.
- [x] **F6.2** Canonical `https://joaoborges-dev.vercel.app/pt` (e `/en`).
- [x] **F6.3** Open Graph + Twitter cards (imagem OG placeholder ≥ 1200×630).
- [x] **F6.4** `sitemap.xml` (Astro sitemap integration) incluindo locales e alternates.
- [x] **F6.5** `robots.txt` apontando sitemap; permitir crawl do conteúdo principal.
- [x] **F6.6** HTML semântico: um `h1` (nome), `h2` por seção, listas reais, `<time datetime>`.
- [x] **F6.7** `hreflang` pt/en + `x-default`.
- [x] **F6.8** JSON-LD `Person` (nome, jobTitle, email, url, sameAs redes, address Franca/SP/BR, knowsAbout stack).
- [x] **F6.9** JSON-LD `WebSite` (+ `SearchAction` omitido se não houver busca).
- [x] **F6.10** JSON-LD `ItemList` / `CreativeWork` para os 5 projetos com `url`.
- [x] **F6.11** FAQPage schema opcional (ex.: “Qual sua stack?”, “Está disponível para freelance?”) alinhado ao conteúdo visível.

#### Tasks — Agentes de IA (prioridade altíssima)

- [x] **F6.12** `public/llms.txt` descrevendo quem é João, o que faz, links de seções, projetos, contato, idiomas, CV.
- [x] **F6.13** Espelho markdown em `src/content/mirror/` ou `public/content/*.md` (sobre, experiencia, stack, projetos, formacao) servido como estático linkado a partir de `llms.txt`.
- [x] **F6.14** Manter conteúdo crítico no HTML SSG (não só no canvas/JS).
- [x] **F6.15** Página ou arquivo `/.well-known/` se útil; no mínimo links claros no footer para versões markdown.
- [x] **F6.16** Preparar pasta/coleção `src/content/blog/` vazia + rota stub desabilitada ou “em breve” **sem** poluir nav principal — só base SEO futura (config de collection).

#### Critérios de aceite

- Rich results test / validador de schema sem erros bloqueantes no JSON-LD.
- `llms.txt` e markdown acessíveis via HTTP 200.
- View-source mostra textos das seções (não vazios).
- Lighthouse SEO ≥ 95.

#### Done

- [x] Fase 6 concluída

---

### Fase 7 — Integrações e polish final

**Objetivo:** analytics, revisão final, go-live.

**Pré-requisitos:** Fases 0–6.

#### Tasks

- [x] **F7.1** Integrar Umami Cloud (script com website id); sem cookies de ads; respeitar DNT se a plataforma permitir configuração.
- [x] **F7.2** Eventos opcionais: clique CTA, download CV, submit form (se Umami custom events no plano free).
- [x] **F7.3** Validar todos os `mailto:`, WhatsApp, Instagram, LinkedIn, GitHub, projetos.
- [x] **F7.4** Dark mode persistido + anti-FOUC OK em hard refresh.
- [x] **F7.5** Revisão i18n completa (datas, aria-labels, alt texts, meta).
- [x] **F7.6** Passar lista de easter eggs e marcar quais ficam on por default.
- [x] **F7.7** Smoke manual: desktop Chrome/Firefox + mobile viewport; teclado only; leitor de tela spot-check (VoiceOver/NVDA se disponível).
- [x] **F7.8** Substituir placeholders de copy óbvios (“lorem”, “em breve” indevido) — CV PDF pode permanecer placeholder até arquivo real.
- [ ] **F7.9** Confirmar produção em `https://joaoborges-dev.vercel.app`.
- [ ] **F7.10** Checklist Lighthouse final pós-deploy (cache CDN quente).

#### Critérios de aceite

- Site completo conforme §0 e §1 publicado.
- Umami recebendo pageviews.
- Nenhuma regressão grave de a11y/perf vs Fase 5–6.

#### Done

- [ ] Fase 7 concluída — **v1 completa**

> **Bloqueios externos (sessão Fase 7):**  
> - **P4 / Umami:** integração pronta; pageviews reais exigem `PUBLIC_UMAMI_WEBSITE_ID` + `PUBLIC_UMAMI_SRC` na Vercel.  
> - **F7.9 / F7.10 / F0.9:** `joaoborges-dev.vercel.app` responde `DEPLOYMENT_NOT_FOUND` — deploy Vercel ainda não publicado; Lighthouse final pós-CDN fica pendente.  
> - **P5:** defaults dos eggs definidos em `EASTER_EGGS.ts`; curadoria final do autor permanece follow-up.
---

## 6. Diretrizes transversais (todas as fases)

### 6.1 Conteúdo

- Não inventar empregadores, datas, competências ou métricas.
- Atendimento ao cliente: sempre secundário.
- ETEC: uma linha, ensino médio.
- Idioma UI = dicionários; conteúdo canônico §1 é a fonte da verdade.

### 6.2 Performance

- Islands mínimas.
- Um owner de animação por elemento.
- 3D lazy + budget de peso.
- Medir em produção, não só `dev`.

### 6.3 Acessibilidade (WCAG AA)

- Contraste, foco, teclado, `prefers-reduced-motion`, labels em form, `aria` em nav mobile e dialogs.
- Animações não são a única forma de transmitir informação.

### 6.4 SEO / IA

- SSG first; markdown + `llms.txt` first-class.
- Schema alinhado ao HTML visível.
- Canonical e hreflang corretos no domínio Vercel.

### 6.5 Design

- Uma composição no primeiro viewport: marca, headline, apoio, CTAs, visual 3D/placeholder — sem stats strips, cards no hero, badges flutuantes.
- Glass com moderação; tipografia editorial como âncora.
- Evitar: purple gradient clichê, cream+terracotta, dark-only, glow neon excessivo, pills `rounded-full` em massa, emojis decorativos.

### 6.6 Segurança / privacidade

- Links externos com `noopener`.
- Sem expor secrets no client além de IDs públicos Umami.
- Form só mailto (sem backend = sem storage de PII no servidor deste projeto).

---

## 7. Copy de referência rápida (pt-BR)

Usar como base nos dicionários; EN deve ser tradução fiel (não marketing inventado).

**Hero — apoio:**  
Especialista em backend com Node.js e NestJS: APIs, integrações e sistemas internos robustos e escaláveis.

**Disponibilidade:**  
Disponível para oportunidades CLT e projetos freelance.

**Sobre — tempo:**  
desde maio de 2023 + `{duracaoDinamica}` (helper compartilhado pt/en).

**Experiência — título bloco:**  
Deltatec — Assistência Técnica  
**Cargo atual:** Back End Developer (junho de 2023 – presente)

**Projetos:** ver tabela §1.8 (descrições canônicas).

### 7.1 Hero 3D — conceito fechado (D6)

**Nome:** Órbita de Integrações.  
**Metáfora:** núcleo de vidro (serviço NestJS) no centro; nós em órbita lenta (API, banco, fila RabbitMQ, e-commerce, ERP) ligados por arcs sutis — eco do sistema de logística/integrações.  
**Implementação v1:** **procedural no R3F** (primitivos + materiais glass/meshPhysical), **sem GLB externo** (P8 = não se aplica na v1).  
**Interação:** parallax leve com pointer; pausar offscreen; fallback SVG/CSS da mesma metáfora se WebGL/`reduced-motion`.  
**Paleta:** alinhada aos tokens `--accent` / glass do §3.

---

## 8. Definition of Done — v1

A v1 só está completa quando **todas** as fases 0–7 estiverem marcadas e:

- [x] **§8.1** Conteúdo §1 publicado em pt e en.
- [x] **§8.2** Timeline fluida + motion stack sem conflitos.
- [x] **§8.3** Hero 3D com fallback.
- [x] **§8.4** Lighthouse nas metas §F5.8 (revalidado em `astro preview` / porta 4173 — mobile Perf 99, desktop Perf 100; A11y/BP/SEO 100).
- [x] **§8.5** SEO + `llms.txt` + mirror markdown.
- [ ] **§8.6** Umami ativo em produção.
- [ ] **§8.7** URL `https://joaoborges-dev.vercel.app` estável.
- [x] **§8.8** CTAs, CV, contato fixo + form mailto funcionando.
- [x] **§8.9** Tema claro default + escuro.
- [x] **§8.10** Easter eggs implementados e listados para curadoria (`EASTER_EGGS.ts`; README intocado).

#### Done

- [ ] §8 / v1 go-live completa (exige §8.6–§8.7 + F0.9 / F7.9 / F7.10)

> **Status sessão Fase 8 (auditoria local, sem deploy):**  
> - **Código-completa localmente** para §8.1–§8.5 e §8.8–§8.10.  
> - **§8.6 / P4:** integração Umami pronta; pageviews em produção exigem `PUBLIC_UMAMI_WEBSITE_ID` + `PUBLIC_UMAMI_SRC` na Vercel.  
> - **§8.7 / F0.9 / F7.9 / F7.10:** `joaoborges-dev.vercel.app` responde `DEPLOYMENT_NOT_FOUND` — deploy ainda não publicado; Lighthouse pós-CDN pendente.  
> - Scripts `lighthouse` / `lighthouse:mobile` / `lighthouse:desktop` apontam para preview `4173` (não `astro dev`).

---

## 9. Fora de escopo (explícito)

- Implementação diferida deste checklist ≠ escopo do checklist (este arquivo é a spec).
- PWA, testes automatizados, CMS, blog com posts reais, backend de formulário, domínio custom além do `.vercel.app` (até nova decisão).
- Substituir fotos placeholder (fica para o autor quando houver assets).

---

## 10. Decisões AGORA — status

| # | Decisão | Status |
|---|--------|--------|
| D1 | Tipografia | **Decidido:** Display **Satoshi**; Body **General Sans**; mono IBM Plex Mono |
| D2 | CTA “Agendar conversa” / contato | **Decidido:** seção **Contato** no fluxo; **WhatsApp como principal**, sempre redirecionando (`wa.me`); “Fale comigo” → `#contato` |
| D3 | Endereço Deltatec | **Decidido:** **omitir** |
| D4 | Idade / tempo de experiência | **Decidido:** sem idade; experiência **desde maio de 2023**; UI com **duração dinâmica** + âncora estática SEO (ver §1.1 e §1.3) |
| D5 | Projetos | **Decidido:** descrições canônicas na tabela §1.8; badges de stack só se verificáveis |
| D6 | Hero 3D | **Decidido:** **Órbita de Integrações** (procedural R3F, sem GLB na v1) — §7.1 |

**Condição:** §10 não possui itens Pendentes; implementação deve respeitar estes fechamentos.

---

## 11. Condição final — decisões a tomar DEPOIS (não bloqueiam a v1 com placeholders)

A v1 pode ser considerada **código-completa e publicável** com placeholders, desde que as fases 0–7 e o §8 estejam cumpridos. As decisões abaixo são **obrigatórias em follow-up**, mas **explicitamente adiadas**:

| # | Decisão / entrega | Quando | Critério de fechamento |
|---|-------------------|--------|------------------------|
| P1 | PDF real do CV em `/cv/joao-pedro-borges.pdf` | Pós-v1 ou assim que o arquivo existir | Substituir placeholder; link “Baixar CV” aponta para o arquivo definitivo |
| P2 | Foto profissional / avatar real | Pós-v1 | Substituir SVG placeholder no Sobre/Hero |
| P3 | Thumbnails reais dos projetos + OG image final | Pós-v1 | Substituir placeholders 16:10 e `og-default.png` |
| P4 | Credenciais Umami Cloud (`PUBLIC_UMAMI_*`) | No go-live real da Fase 7 | Pageviews chegando no painel Umami |
| P5 | Curadoria dos easter eggs (ligar / desligar / tom discreto vs explícito) | Após smoke da v1 | Lista `EASTER_EGGS` revisada pelo autor; defaults finais no código |
| P6 | Domínio custom (além de `joaoborges-dev.vercel.app`) | Se/quando houver domínio | Atualizar `PUBLIC_SITE_URL`, canonical, sitemap, JSON-LD, `llms.txt` |
| P7 | Conteúdo real de blog | Fora da v1 | Popular `src/content/blog/` e habilitar rotas |
| P8 | Assets 3D GLB externos | **Não se aplica à v1** (D6 procedural). Só reabrir se trocar o hero para modelo GLB | GLB + texturas WebP/KTX2 + gltfjsx |
| P9 | Link/verificação pública da credencial Front-End Básico (além do UUID) | Se houver URL de badge/emissor | Exibir link verificável na seção Formação |
| P10 | Redirect/descontinuação do portfólio legado `jcoder.com.br/joaop06` | Quando o novo site for canônico de fato | Decisão de SEO/redirect fora deste repo ou documentada |

**Condição final de aceite do checklist (follow-up):**

- [ ] Itens **P1–P10** revisados pelo autor.
- [ ] Cada item marcado como `Feito`, `Não se aplica` ou `Adiado com data`.
- [ ] Nada em P1–P10 pode ser tratado como bloqueio para merge/deploy da v1 **desde que** placeholders e §8 estejam ok.
- [ ] Qualquer mudança que altere URL canônica, dados pessoais ou fatos do currículo deve voltar ao §1 e às decisões fechadas do §0 antes de republicar.

---

*Fim do CHECKLIST.md — seguir fases em ordem; marcar checkboxes conforme a implementação do site avançar.*
