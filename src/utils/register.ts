export type Component = (index: string) => {
  template: string;
  script: string;
  key: string;
  value: any;
  extra?: string;
};

export function genRegisterComponentCurry(map: Map<string[], Component>) {
  return function ({ key, value }: { key: string[]; value: Component }) {
    map.set(key, value);
  };
}
