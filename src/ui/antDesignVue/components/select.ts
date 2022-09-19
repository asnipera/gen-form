import { Componet } from "../../../utils/register";

export const key = ["select", "下拉", "选择器"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <a-select v-model:value="formState.${model}" placeholder="">
        <a-select-option value="">option</a-select-option>
    </a-select>
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
