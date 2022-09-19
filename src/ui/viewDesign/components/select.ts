import { Componet } from "../../../utils/register";

export const key = ["select", "下拉", "选择器"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <Select  v-model="formState.${model}" placeholder="">
    Option  value="">option</Option >
    </Select>
  `,
    script: `const modalValue${index} = ref('');`,
    key: model,
    value: "",
  };
};

export const select = {
  key,
  value,
};
