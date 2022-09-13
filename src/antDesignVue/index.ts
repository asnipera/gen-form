import { autoComplete } from './components/autoComplete';
import { cascader } from './components/cascader';
import { checkbox } from './components/Checkbox';
import { datePicker } from './components/datePicker';
import { input } from './components/input';
import { inputNumber } from './components/inputNumber';
import { radio } from './components/radio';
import { select } from './components/select';
import { timerPicker } from './components/timerPicker';
import { treeSelect } from './components/treeSelect';
import { upload } from './components/upload';

const templateMap = new Map<string[], string>();
function registerComponents({ key, value }: { key: string[]; value: string }) {
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
  let value = '';
  Array.from(templateMap.keys()).forEach((key) => {
    if (key.includes(tag)) {
      value = templateMap.get(key)!;
    }
  });
  return value;
}

export { templateMap };
