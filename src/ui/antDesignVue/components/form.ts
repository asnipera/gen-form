export const slot = `<slot />`;

function formItem(slot: string, name: string) {
  return `
  <a-form-item has-feedback label="" name="${name}">
      ${slot}
  </a-form-item>
  `;
}

export const form = `
<a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
  >
  ${slot}
</a-form>
`;

const col = function (span: number, formItem: string) {
  return `
  <a-col :span="${span}">
      ${formItem}
  </a-col>
  `;
};

const row = `
  <a-row :gutter="24">
      ${slot}
  </a-row>
  `;

export function wrapAntFormItem(template: string, name: string) {
  return formItem(template, name);
}

export function wrapAntForm(template: string[]) {
  return form.replace(slot, template.join(""));
}

export function wrapAntRow(col: string) {
  return row.replace(slot, col);
}

export function wrapAntCol(span: number, formItem: string) {
  return col(span, formItem);
}
