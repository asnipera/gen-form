import { genMutipleLineTmpl } from "../../../utils/utils";

export const slot = `<slot />`;

function formItem(slot: string, index: string) {
  return `
  <FormItem label="字段${index}" prop="modalValue${index}">
      ${slot}
  </FormItem >
`;
}

export const form = `
<Form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    :label-width="80"
  >
  ${slot}
</Form>`; //尾部不能有换行，否则gogocode.replace会报错

const col = function (span: number, formItem: string) {
  return `
  <Col :span="${span}">
      ${formItem}
  </Col>
  `;
};

const row = `
  <Row :gutter="24">
      ${slot}
  </Row>
  `;

export function wrapViewDesignFormItem(template: string, name: string) {
  return formItem(template, name);
}

export function wrapViewDesignForm(template: string[]) {
  return form.replace(slot, genMutipleLineTmpl(template));
}

export function wrapViewDesignRow(col: string) {
  return row.replace(slot, col);
}

export function wrapViewDesignCol(span: number, formItem: string) {
  return col(span, formItem);
}
