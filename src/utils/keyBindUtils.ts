import { KeyBindings } from "../types/KeyBindings";

const defaultKeyBinds: KeyBindings = {
  panUp: "w",
  panDown: "s",
  panLeft: "a",
  panRight: "d",
  zoomIn: "z",
  zoomOut: "x",
  rotateCW: "q",
  rotateCCW: "e",
  flyUp: "r",
  flyDown: "f",
  pause: " ",
};

export const getDefaultKeyBinds = (): KeyBindings => {
  return { ...defaultKeyBinds };
};
