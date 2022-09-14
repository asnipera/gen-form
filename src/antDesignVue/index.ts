import { autoComplete } from "./components/autoComplete";
import { cascader } from "./components/cascader";
import { checkbox } from "./components/Checkbox";
import { datePicker } from "./components/datePicker";
import { input } from "./components/input";
import { inputNumber } from "./components/inputNumber";
import { radio } from "./components/radio";
import { select } from "./components/select";
import { timerPicker } from "./components/timerPicker";
import { treeSelect } from "./components/treeSelect";
import { upload } from "./components/upload";

export type Componet = (index: string) => {
  template: string;
  script: string;
  key: string;
  value: any;
  extra?: string;
};
const templateMap = new Map<string[], Componet>();
function registerComponents({
  key,
  value,
}: {
  key: string[];
  value: Componet;
}) {
  templateMap.set(key, value);
}

registerComponents(input);
registerComponents(select);
registerComponents(autoComplete);
registerComponents(cascader);
registerComponents(checkbox);
registerComponents(datePicker);
registerComponents(inputNumber);
registerComponents(radio);
registerComponents(timerPicker);
registerComponents(treeSelect);
registerComponents(upload);

export function getTagTemplate(tag: string) {
  let value: Componet | undefined;
  Array.from(templateMap.keys()).forEach((key) => {
    if (key.includes(tag.trim())) {
      value = templateMap.get(key)!;
    }
  });
  return value;
}

export function getInlineTagTemplate(inlineTag: string) {
  const tags = inlineTag.split("|");
  return tags.map((tag) => tag.trim());
}

export { templateMap };
