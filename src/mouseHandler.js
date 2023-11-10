const MouseButtons = {
  LEFT_MOUSE_BUTTON: 0,
  MIDDLE_MOUSE_BUTTON: 1,
  RIGHT_MOUSE_BUTTON: 2,
};

export const mouseState = {
  /**
   * @type {boolean}
   */
  isLeftMouseDown: false,
  /**
   * @type {boolean}
   */
  isMiddleMouseDown: false,
  /**
   * @type {boolean}
   */
  isRightMouseDown: false,
};

/**
 *  Gets the mouse button press state.  Should be called first on mouse down.
 * @param {MouseEvent} event The mouse event fired on mouse down.
 */
export const setMouseDownState = (event) => {
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
export const setMouseUpState = (event) => {
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
