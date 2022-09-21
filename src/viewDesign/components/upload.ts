import { Component } from "../../utils/register";

export const key = ["upload", "上传"];
export const value: Component = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <Upload v-model="formState.${model}" action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    `,
    key: model,
    value: null,
  };
};

export const upload = {
  key,
  value,
};
