import { CursorGlow } from "./CursorGlow";

/**
 * Camada global do fundo. Como cada seção é uma folha opaca com o próprio
 * fundo (veja SheetBackground), aqui só resta o brilho que acompanha o mouse,
 * que fica por cima das folhas.
 */
export function Background() {
  return <CursorGlow />;
}
