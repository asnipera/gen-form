import { Componet } from "../../../utils/register";

export const key = ["checkbox", "多选框", "多选", "复选"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `<Checkbox  v-model="formState.${model}">Checkbox</a-checkbox>`,
    key: model,
    value: true,
  };
};
export const checkbox = {
  key,
  value,
};
