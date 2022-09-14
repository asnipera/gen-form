import { Componet } from "../../utils/register";

export const key = ["datePicker", "date", "日期", "日期选择框"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<a-date-picker v-model:value="formState.${model}" placeholder="" />`,
    script: `const ${model} = ref('');`,
    key: model,
    value: "",
  };
};

export const datePicker = {
  key,
  value,
};
