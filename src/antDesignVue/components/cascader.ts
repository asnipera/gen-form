import { Componet } from "..";

export const key = ["cascader", "级联", "级联选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<a-cascader v-model:value="formState.${model}" :options="options" placeholder="" />`,
    script: `const ${model} = ref([]);`,
    key: model,
    value: [],
  };
};
export const cascader = {
  key,
  value,
};
