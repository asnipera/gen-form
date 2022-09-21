import { genMutipleLineTmpl } from "../../../utils/utils";

export const alias = ["select", "下拉", "选择器"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  const template = [
    `<a-select v-model:value="formState.${model}" placeholder="">`,
    '<a-select-option value="">option</a-select-option>',
    "</a-select>",
  ];

  return {
    template: genMutipleLineTmpl(template),
    key: model,
    value: "",
  };
};

export const select = {
  alias,
  value,
};
