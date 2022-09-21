import { Component, genRegisterComponentCurry } from "../utils/register";
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

const iviewComponentTemplates = new Map<string[], Component>();
const registerComponents = genRegisterComponentCurry(iviewComponentTemplates);

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

export { iviewComponentTemplates };
