type Componet = (index: string) => {
  template: string;
  key: string;
  value: any;
  extra?: string;
};

type ComponetMap = Map<string[], Componet>;
