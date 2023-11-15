import * as THREE from "three";

enum MouseButtons {
  LEFT_MOUSE_BUTTON,
  MIDDLE_MOUSE_BUTTON,
  RIGHT_MOUSE_BUTTON,
}

export const mouseState = {
  isLeftMouseDown: false,
  isMiddleMouseDown: false,
  isRightMouseDown: false,
  mousePosition: new THREE.Vector2(),
};

export const currentKeysPressed = new Set<string>();

/**
 *  Gets the mouse button press state.  Should be called first on mouse down.
 * @param {MouseEvent} event The mouse event fired on mouse down.
 */
export const setMouseDownState = (event: MouseEvent) => {
  switch (event.button) {
    case MouseButtons.LEFT_MOUSE_BUTTON:
      mouseState.isLeftMouseDown = true;
      break;
    case MouseButtons.MIDDLE_MOUSE_BUTTON:
      mouseState.isMiddleMouseDown = true;
      break;
    case MouseButtons.RIGHT_MOUSE_BUTTON:
      mouseState.isRightMouseDown = true;
      break;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

/**
 * Gets the mouse button release state.  Should be called first on mouse up.
 * @param {MouseEvent} event The mouse event fired on mouse up.
 */
export const setMouseUpState = (event: MouseEvent) => {
  switch (event.button) {
    case MouseButtons.LEFT_MOUSE_BUTTON:
      mouseState.isLeftMouseDown = false;
      break;
    case MouseButtons.MIDDLE_MOUSE_BUTTON:
      mouseState.isMiddleMouseDown = false;
      break;
    case MouseButtons.RIGHT_MOUSE_BUTTON:
      mouseState.isRightMouseDown = false;
      break;
  }
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

export const setKeyDownState = (event: KeyboardEvent) => {
  currentKeysPressed.add(event.key);
};

export const setKeyUpState = (event: KeyboardEvent) => {
  currentKeysPressed.delete(event.key);
};
