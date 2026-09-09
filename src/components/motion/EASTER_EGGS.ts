/**
 * EASTER_EGGS — inventário + defaults F7.6 (curadoria final do autor = P5).
 * NÃO listar no README (pedido do autor). Desligar: remova/comente a island
 * `<EasterEggs />` em BaseLayout, ou os flags em `EASTER_EGG_FLAGS`.
 *
 * | ID | Trigger | Efeito | Default F7.6 |
 * |----|---------|--------|--------------|
 * | konami | ↑↑↓↓←→←→BA | tema accent temporário + toast | ON |
 * | name-clicks | 7 cliques no nome (`[data-egg-name]`) | terminal ASCII one-liner | ON |
 * | shortcuts | tecla `?` | overlay Radix de atalhos | ON |
 * | nest-favorite | hover longo (~1.2s) no logo Nest | tooltip “favorite stack” | ON |
 * | console-hello | load | console.log estilizado | ON |
 * | hash-matrix | `#matrix` | chuva de glyphs (mais intrusivo) | OFF |
 * | hash-coffee | `#coffee` | overlay café / toast | ON |
 *
 * Hash secrets (`#matrix` / `#coffee`) permanecem em `SECRET_HASHES` mesmo com flag OFF
 * (ScrollRuntime não trata como âncora de seção).
 */
export const EASTER_EGG_FLAGS = {
  konami: true,
  nameClicks: true,
  shortcuts: true,
  nestFavorite: true,
  consoleHello: true,
  /** Off por default na v1 — visual mais agressivo; reativar em P5 se desejado. */
  hashMatrix: false,
  hashCoffee: true,
} as const;

export const NAME_CLICK_THRESHOLD = 7;
export const NEST_HOVER_MS = 1200;
