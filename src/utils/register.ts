export type Componet = (index: string) => {
  template: string;
  key: string;
  value: any;
  extra?: string;
};

export type ComponetMap = Map<string[], Componet>;

export function genRegisterComponentCurry(map: ComponetMap) {
  return function ({ key, value }: { key: string[]; value: Componet }) {
    map.set(key, value);
  };
}
