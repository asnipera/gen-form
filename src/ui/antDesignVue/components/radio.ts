export const key = ["radio", "单选框", "单选"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: [
      `<a-radio-group v-model:value="formState.${model}" name="radioGroup">`,
      '<a-radio value="1">A</a-radio>',
      '<a-radio value="2">B</a-radio>',
      "</a-radio-group>",
    ].join(""),
    key: model,
    value: "1",
  };
};
export const radio = {
  key,
  value,
};
