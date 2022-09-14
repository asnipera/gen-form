import { Componet } from "..";

export const key = ["input", "输入框"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<a-input v-model:value="formState.${model}" placeholder="" />`,
    script: `const ${model} = ref('');`,
    key: model,
    value: "",
  };
};

export const input = {
  key,
  value,
};
