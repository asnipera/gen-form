import { Componet } from "../../../utils/register";

export const key = ["cascader", "级联", "级联选择"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Cascader v-model="formState.${model}" :data="options" placeholder="" />`,
    script: `const ${model} = ref([]);`,
    key: model,
    value: [],
  };
};
export const cascader = {
  key,
  value,
};
