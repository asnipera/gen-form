export type Componet = (index: string) => {
  template: string;
  script: string;
  key: string;
  value: any;
  extra?: string;
};

export function genRegisterComponentCurry(map: Map<string[], Componet>) {
  return function ({ key, value }: { key: string[]; value: Componet }) {
    map.set(key, value);
  };
}
