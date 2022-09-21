import { Componet } from "../../../utils/register";

export const key = ["radio", "单选框", "单选"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: [
      `<RadioGroup v-model="formState.${model}" name="radioGroup">`,
      '<Radio label="1"></Radio>',
      '<Radio label="2"></Radio>',
      "</RadioGroup>",
    ].join(""),
    key: model,
    value: "1",
  };
};
export const radio = {
  key,
  value,
};
