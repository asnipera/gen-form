import { VIEW_DESIGN } from "../constant";
import { UIType } from "../utils";

export const slot = `<slot />`;

function antFormItem(slot: string, name: string) {
  return `
  <a-form-item has-feedback label="" name="${name}">
      ${slot}
  </a-form-item>
  `;
}

function iviewFormItem(slot: string, name: string) {
  return `
  <FormItem label="" prop="${name}">
      ${slot}
  </FormItem>
  `;
}

export const antForm = `
<a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
  >
  ${slot}
</a-form>
`;

export const iviewForm = `
<Form
    ref="formRef"
    :model="formState"
    :rules="rules"
  >
  ${slot}
</Form>
`;

const antCol = function (span: number, formItem: string) {
  return `
  <a-col :span="${span}">
      ${formItem}
  </a-col>
  `;
};

const iviewCol = function (span: number, formItem: string) {
  return `
  <Col span="${span}">
      ${formItem}
  </Col>
  `;
};

const antRow = `
  <a-row :gutter="24">
      ${slot}
  </a-row>
  `;

const iviewRow = `
  <Row :gutter="24">
      ${slot}
  </Row>
  `;

export function wrapFormItem(ui: UIType, template: string, name: string) {
  return ui === VIEW_DESIGN ? iviewFormItem(template, name) : antFormItem(template, name);
}

export function wrapForm(ui: UIType, template: string[]) {
  return (ui === VIEW_DESIGN ? iviewForm : antForm).replace(slot, template.join(""));
}

export function wrapCol(ui: UIType, span: number, formItem: string) {
  return ui === VIEW_DESIGN ? iviewCol(span, formItem) : antCol(span, formItem);
}

export function wrapRow(ui: UIType, col: string) {
  return (ui === VIEW_DESIGN ? iviewRow : antRow).replace(slot, col);
}
