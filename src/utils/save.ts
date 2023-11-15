export const saveKeys = {
  keyBindings: "keyBindings" as const,
  game: "game" as const,
};

export const save = (data: unknown, key: string) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error(err);
  }
};

export const load = (key: string): unknown => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
