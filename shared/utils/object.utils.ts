export const findObjectPath = <T>(root: Record<string, any>, target: T, splitter = '.', path = splitter): string | undefined => {
  for (const key in root) {
    const current = root[key];

    if (current === target) return path + key;

    if (typeof current === 'object' && current !== null) {
      const result = findObjectPath(current, target, splitter, path + key + splitter);
      if (result) return result;
    }
  }

  return undefined;
};
