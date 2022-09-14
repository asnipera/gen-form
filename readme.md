<p align="center">
<img src="https://github.com/asnipera/gen-form/blob/main/sniper.png?raw=true" />
</p>
<h1 align="center">
gen form <em> ⚡️</em>
</h1>
<p align="center">
一键 <em><b>快速</b></em> 生成表单
</o>
<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=liyan-sz.gen-form" target="__blank">
<img src="https://img.shields.io/visual-studio-marketplace/v/liyan-sz.gen-form.svg?color=228cb3&amp;label=" alt="Visual Studio Marketplace Version" /></a>
</p>

- ⚡️ 一键生成form表单
- 🚀 快捷键和右键菜单
- 📚 支持ant-design-vue

## 快捷键

`ctrl+d`
## 右键菜单

`生成表单`



## 使用方式
### 在模板中输入组件对应的中英文标签

1. 通过右键菜单生成表单
```js
<template>
    // 英文标签
    input
    select
</template>
```
```js
<template>
    // 中英文标签
    input
    单选
    多选
</template>
```
<p>
<img alt="Demo" src="https://github.com/asnipera/gen-form/blob/main/src/assets/contextMenu.gif?raw=true">
</p>

2. 通过快捷键（`ctrl+alt+z`）生成表单
```js
<template>
    // 通过快捷键生成表单时，必须在始末位置添加````标记
    ````
    input
    单选
    多选
    ````
</template>
```

<p>
<img alt="Demo" src="https://github.com/asnipera/gen-form/blob/main/src/assets/shortcut.gif?raw=true">
</p>

3. 一行多列
```js
<template>
    // 行内组件通过|隔开（一行两列）
    ````
        input|radio
        datePicker | 多选框
    `````
</template>
```

<p>
<img alt="Demo" src="https://github.com/asnipera/gen-form/blob/main/src/assets/mutipleCol.gif?raw=true">
</p>

# 标签
|  标签   | 英文  | 中文  |
|  ----  | ----  |----  |
| autoComplete  | autoComplete, complete, auto, | 自动完成, 自动 |
| cascader  | cascader |级联, 级联选择 |
| checkbox  | checkbox |多选框, 多选, 复选 |
| datePicker  | datePicker, date |日期, 日期选择框 |
| input  | input |输入框 |
| inputNumber  | inputNumber | 数字, 数字输入框 |
| radio  | radio |单选框, 单选 |
| select  | select |下拉, 选择器 |
| timerPicker  | timerPicker, timer |时间选择框, 时间 |
| treeSelect  | treeSelect, tree |树, 树选择 |
| upload  | upload | 上传 |
