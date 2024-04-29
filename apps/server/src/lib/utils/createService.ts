export const createService = <T extends Record<string, Function>>(service: T): T => {
  const newService = { ...service };

  Object.entries(newService).forEach(([key, value]) => {
    // @ts-ignore
    newService[key] = new Proxy(value, {
      async apply(target, thisArgs, args) {
        // TODO 공통 예외 처리 (IE-54)
        try {
          return await Reflect.apply(target, thisArgs, args);
        } catch (error) {}
      },
    });
  });

  return newService;
};
