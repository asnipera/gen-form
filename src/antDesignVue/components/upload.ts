import { Componet } from "../../utils/register";

export const key = ["upload", "上传"];
export const value: Componet = function (index: string) {
  const model = `modalValue${index}`;
  return {
    template: `
    <a-upload
      v-model:file-list="formState.${model}"
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      :headers="headers"
      @change="handleChange"
      >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>`,
    script: `const ${model} = ref('');`,
    key: model,
    value: "",
  };
};

export const upload = {
  key,
  value,
};
