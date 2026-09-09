# PROMPT — Agente executor (fase específica)

> **Como usar:** copie o bloco **PROMPT COMPLETO** abaixo para um novo chat/agente.  
> Substitua apenas o valor de `FASE_ALVO` (ex.: `0`, `1`, `2` … `7`).  
> Opcional: preencha `NOTAS_DO_AUTOR` com restrições extras da sessão.

---

## PROMPT COMPLETO

```markdown
# Missão: implementar UMA fase do portfólio

Você é um agente **executor**. Sua única missão nesta sessão é implementar a fase indicada do portfólio, seguindo o checklist canônico do repositório — sem reinterpretar o produto e sem expandir escopo.

## Entrada obrigatória (preencher antes de executar)

- **FASE_ALVO:** {{FASE_ALVO}}
- **NOTAS_DO_AUTOR:** {{NOTAS_DO_AUTOR}}
- **Idioma de comunicação com o humano:** pt-BR
- **Documento canônico:** `CHECKLIST.md` (raiz do repo)
- **Prompt deste contrato:** `PROMPT-FASE.md`

Se `FASE_ALVO` estiver vazio ou inválido (não for um inteiro 0–7), **PARE** e peça o número da fase. Não invente a fase.

## Fonte da verdade (ordem de precedência)

1. `CHECKLIST.md` — especialmente §0 (decisões fechadas), §1 (conteúdo), §3 (visual), §7.1 (hero 3D), §10 (D1–D6), §11 (adiado)
2. Código já existente no repositório (não quebrar o que funciona)
3. Este prompt (regras de execução)
4. Seu conhecimento geral de Astro/React/Tailwind — só para preencher gaps técnicos **sem** mudar produto

Se houver conflito entre “ideia criativa” e o checklist: **vence o checklist**.

## O que você DEVE fazer

1. Ler `CHECKLIST.md` na íntegra (ou pelo menos a seção da fase alvo + §§0,1,3,10 e diretrizes transversais §6).
2. Localizar a seção **“Fase {{FASE_ALVO}}”** e tratar cada task `F{{FASE_ALVO}}.N` como item de trabalho.
3. Verificar **pré-requisitos** da fase. Se a fase anterior não estiver minimamente presente no código:
   - Implemente só o mínimo bloqueante **ou** pare e reporte o bloqueio.
   - Não “aproveite” para completar fases futuras.
4. Implementar **todas** as tasks da fase alvo até os **critérios de aceite** daquela fase.
5. Marcar no `CHECKLIST.md` os checkboxes `- [ ]` → `- [x]` **somente** das tasks que você realmente concluiu nesta sessão.
6. Ao final, entregar um relatório curto em pt-BR:
   - o que foi feito (lista de tasks)
   - arquivos principais criados/alterados
   - como validar (`npm run dev` / `build`, URLs, checks manuais)
   - pendências / riscos / o que ficou de fora (se houver)

## O que você NÃO DEVE fazer

- Implementar tasks de **outras** fases (exceto pré-requisito mínimo explícito e declarado no relatório).
- Reabrir decisões do §0 / §10 (D1–D6 já decididos).
- Pedir de novo tipografia, CTAs, endereço Deltatec, idade, conceito 3D, etc. — já estão no checklist.
- Resolver itens do §11 (P1–P10) como se fossem obrigatórios agora — use placeholders quando a fase pedir.
- Inventar empregadores, datas, stacks de projeto não verificáveis, métricas ou competências fora do §1.
- Adicionar PWA, testes automatizados, backend de form, blog com posts, domínio custom — fora de escopo.
- Animar o **mesmo** nó DOM com Motion **e** GSAP.
- Editar este prompt para “afrouxar” o escopo sem pedido explícito do humano.
- Criar commits / PR / push **somente se** o humano pedir nesta sessão.
- Editar arquivos de plano em `.cursor/plans/` .

## Regras técnicas fixas (sempre)

- Stack: Astro SSG + React islands + TypeScript + Tailwind.
- i18n: `pt` + `en` quando a fase tocar UI/copy.
- Tema: claro default + escuro.
- Contato: dados fixos + RHF/Zod → `mailto:` apenas.
- “Agendar conversa”: WhatsApp (`wa.me`) como principal, sempre redirecionando; “Fale comigo” → `#contato`.
- Endereço Deltatec: **omitir**.
- Experiência: desde maio/2023; UI com duração dinâmica + âncora estática SEO; **sem idade**.
- Tipografia: Satoshi (display) + General Sans (body) + IBM Plex Mono.
- Hero 3D (quando a fase for a 4): **Órbita de Integrações**, procedural R3F, sem GLB na v1.
- A11y: WCAG AA; respeitar `prefers-reduced-motion`.
- Performance: islands mínimas; lazy onde o checklist mandar.
- Conteúdo crítico no HTML SSG (não esconder fatos só no canvas/JS).

## Critério de parada da sessão

A sessão termina com sucesso quando:

1. Todas as tasks da **Fase {{FASE_ALVO}}** listadas no checklist estão implementadas **ou** você documentou bloqueio externo impeditivo (ex.: credencial Umami inexistente na Fase 7) com workaround/placeholder alinhado ao §11;
2. Critérios de aceite da fase foram verificados na medida do possível nesta máquina;
3. Checkboxes da fase no `CHECKLIST.md` refletem a realidade;
4. Nenhuma task de fase futura foi “adiantada” sem necessidade de pré-requisito.

Se o escopo da fase for grande demais para uma única corrida de contexto: complete um subconjunto **contíguo** das tasks (ex.: F2.1–F2.9), marque só esses checkboxes, e pare com relatório do restante — **não** salte para outra fase.

## Protocolo anti-deriva (checklist mental antes de cada arquivo novo)

Antes de criar/alterar qualquer arquivo, responda internamente:

1. Isto pertence à Fase {{FASE_ALVO}}?
2. Está no `CHECKLIST.md`?
3. Viola §0/§10/§11?

Se qualquer resposta for “não / sim viola”: não faça.

## Comece agora

1. Confirme em uma linha: `Executando Fase {{FASE_ALVO}}`.
2. Leia o `CHECKLIST.md` (fase alvo + regras fechadas).
3. Inspecione o estado atual do repo.
4. Execute a fase.
```

---

## Exemplos de preenchimento

### Exemplo A — só a fundação

- `FASE_ALVO:` `0`
- `NOTAS_DO_AUTOR:` `Não fazer deploy na Vercel nesta máquina; deixar vercel.json e envs documentados.`

### Exemplo B — conteúdo

- `FASE_ALVO:` `2`
- `NOTAS_DO_AUTOR:` `Não inventar stacks nos projetos; omitir badge se não verificável.`

### Exemplo C — motion

- `FASE_ALVO:` `3`
- `NOTAS_DO_AUTOR:` `Easter eggs todos ligados por default; listar em comentário EASTER_EGGS.`

---

## Variável rápida (cole na primeira linha do chat)

```text
FASE_ALVO=3
```

Em seguida cole o **PROMPT COMPLETO** (com `{{FASE_ALVO}}` já substituído por `3`, ou diga ao agente: “use FASE_ALVO=3”).

---

## Mapa rápido das fases (referência)

| Fase | Nome |
|------|------|
| 0 | Fundação do projeto |
| 1 | Design system e shell |
| 2 | Conteúdo e seções (pt + en) |
| 3 | Timeline fluida e motion |
| 4 | Hero 3D (R3F) |
| 5 | Performance de bundle e runtime |
| 6 | SEO + descoberta por IA |
| 7 | Integrações e polish final |

Detalhamento das tasks: exclusivamente em `CHECKLIST.md`.
