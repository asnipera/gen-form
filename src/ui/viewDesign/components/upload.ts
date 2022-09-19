import { Componet } from "../../../utils/register";

export const key = ["upload", "上传"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <Upload
      :before-upload="handleUpload"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      name="file"
      @change="on-success"
      >
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>`,
    script: `const ${model} = ref('');`,
    key: model,
    value: "",
  };
};

export const upload = {
  key,
  value,
};
