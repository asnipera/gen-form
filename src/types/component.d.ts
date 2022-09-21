type Componet = (index: string) => {
  template: string;
  key: string;
  value: any;
  v2Datas?: Record<string, any>;
  v3Datas?: string[];
};

type ComponetMap = Map<string[], Componet>;
