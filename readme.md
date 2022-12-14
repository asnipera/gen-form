<p align="center">
<img src="https://github.com/asnipera/gen-form/blob/main/src/assets/sniper.png?raw=true" />
</p>
<h1 align="center">
Lazy Form <em> ⚡️</em>
</h1>
<p align="center">
 <em><b>一键</b></em> 生成表单
</o>
<center>
<a href="https://marketplace.visualstudio.com/items?itemName=liyan-sz.lazy-form" target="__blank">

![VSCode Marketplace](https://img.shields.io/vscode-marketplace/v/liyan-sz.lazy-form.svg?style=flat-square&label=vscode%20marketplace)

</a>
</center>

- ⚡️ 一键生成form表单
- 🚀 快捷键和右键菜单
- 📚 支持Ant Design Vue
- 📚 支持View Design

## 快捷键

`ctrl+alt+p`
## 右键菜单

`生成表单`



## 使用方式
### 1. 在模板中添加form选择器，可在设置模板自定义form选择器
```js
<template>
    <div id="f">

    </div>
</template>
```
### 2. 在模板中输入组件对应的中英文标签

- 通过右键菜单生成表单
```js
<template>
    // 英文标签
    <div id="f">
        input
        select
    </div>
   
</template>
```
```js
<template>
    // 中英文标签
    <div id="f">
        input
        单选
        多选
    </div>
    
</template>
```
<p>
<img alt="Demo" src="https://github.com/asnipera/gen-form/blob/main/src/assets/contextMenu.gif?raw=true">
</p>

- 通过快捷键（`ctrl+alt+p`）生成表单

</p>

- 一行多列
```js
<template>
    // 行内组件通过|隔开（一行两列）
     <div id="f">
        input|radio
        datePicker | 多选框
    </div>
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


# Dev

## install
```js
npm install
```

## debugger
```js
F5
```

## build
```js
vsce package
```

## publish
```js
vsce publish
```