export function genRegisterComponentCurry(map: ComponetMap) {
  return function ({ alias, value }: { alias: string[]; value: Componet }) {
    map.set(alias, value);
  };
}
