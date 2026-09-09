/**
 * EASTER_EGGS — inventário para curadoria (F3.17).
 * NÃO listar no README (pedido do autor). Desligar: remova/comente a island
 * `<EasterEggs />` em BaseLayout, ou os flags em `EASTER_EGG_FLAGS`.
 *
 * | ID | Trigger | Efeito |
 * |----|---------|--------|
 * | konami | ↑↑↓↓←→←→BA | tema accent temporário + toast |
 * | name-clicks | 7 cliques no nome (`[data-egg-name]`) | terminal ASCII one-liner |
 * | shortcuts | tecla `?` | overlay Radix de atalhos |
 * | nest-favorite | hover longo (~1.2s) no logo Nest | tooltip “favorite stack” |
 * | console-hello | load | console.log estilizado |
 * | hash-matrix | `#matrix` | chuva discreta de glyphs |
 * | hash-coffee | `#coffee` | overlay café / toast |
 */
export const EASTER_EGG_FLAGS = {
  konami: true,
  nameClicks: true,
  shortcuts: true,
  nestFavorite: true,
  consoleHello: true,
  hashMatrix: true,
  hashCoffee: true,
} as const;

export const NAME_CLICK_THRESHOLD = 7;
export const NEST_HOVER_MS = 1200;
