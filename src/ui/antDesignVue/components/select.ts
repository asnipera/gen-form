import { envProxy } from "../../../utils/proxy";
import { Componet } from "../../../utils/register";
import { genMutipleLineTmpl } from "../../../utils/utils";

export const key = ["select", "下拉", "选择器"];

export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  const template = [
    `<a-select v-model:value="formState.${model}" placeholder="">`,
    '<a-select-option value="">option</a-select-option>',
    "</a-select>",
  ];

  return {
    template: genMutipleLineTmpl(template),
    script: `const modalValue${index} = ref('');`,
    key: model,
    value: "",
  };
};

export const select = {
  key,
  value,
};
