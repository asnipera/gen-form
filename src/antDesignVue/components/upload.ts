export const key = ['upload', '上传'];
export const value = `
<a-upload
  v-model:file-list="fileList"
  name="file"
  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  :headers="headers"
  @change="handleChange"
  >
  <a-button>
    <upload-outlined></upload-outlined>
    Click to Upload
  </a-button>
</a-upload>`;

export const upload = {
  key,
  value,
};
