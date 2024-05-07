## react-native-iconfont-cli

用纯 JS 把 iconfont.cn 的图标转换成 RN 组件，不依赖字体，支持多色彩，支持热更新

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/icons.png?raw=true)

## 痛点

通常地，当我们想在 RN 里使用 iconfont，我们可能会借助`react-native-vector-icons`导入 ttf 字体文件，或者直接手动下载各个 svg 文件到本地，然后单个使用。

使用 ttf 字体有一个弊端，就是每次更新图标，都要相应的更新 ttf 文件，然后再次打包发布 APP。而且 ttf 不支持多种色彩的图标，导致所有图标都是单色。如果你是借助`react-native-vector-icons`，该库内置了 10 多套 ttf 文件，合起来有`2M`左右；你可能用不到它们，但是它们仍然会被打包进你的 APP 里。

下载 svg 到本地也不方便，因为你需要额外维护一份图标字体，有可能造成线上和本地的图标不一致问题。而且如果你想动态地改变 svg 的渲染色彩，基本上是不可能的，只能渲染原图的颜色。

---

为了解决这些问题，我用纯 Javascript 实现 iconfont 到 React 组件的转换操作，**不需要依赖 ttf 字体文件**，不需要手动下载图标到本地。

## 特性

1、纯组件，不依赖字体，体积小
<br />
2、支持渲染多色彩图标，支持自定义颜色
<br />
3、支持热更新
<br />
4、自动化生成图标组件，支持 es6 和 typescript 两种文件格式

## Step 1

安装插件

```bash
# Yarn
yarn add react-native-svg
yarn add @sj-distributor/react-native-iconfont-cli --dev

# Npm
npm install react-native-svg
npm install @sj-distributor/react-native-iconfont-cli --save-dev
```

# Step 2

静态链接。请注意您使用的 React-Native 版本号

```bash
# RN < 0.60
react-native link react-native-svg

# RN >= 0.60
cd ios && pod install
```

# Step 3

生成配置文件

```bash
npx sj-iconfont-init
```

此时项目根目录会生成一个`iconfont.json`的文件，内容如下：

```json
{
  "symbol_url": "请参考README.md，复制官网提供的JS链接",
  "use_typescript": false,
  "save_dir": "./src/iconfont",
  "trim_icon_prefix": "icon",
  "default_icon_size": 18,
  "local_svgs": "./localSvgs"
}
```

### 配置参数说明：

### symbol_url

请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css 后缀。如果你现在还没有创建 iconfont 的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js`

<br />

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

### use_typescript

如果您的项目使用 Typescript 编写，请设置为 true。这个选项将决定生成的图标组件是`.tsx`还是`.js`后缀。

当该值为 false 时，我们会为您的图标生成`.js`和`.d.ts`两种文件，以便您能享受到最好的开发体验。

### save_dir

根据 iconfont 图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

### trim_icon_prefix

如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

### default_icon_size

我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入 props 的方式改变这个 size 值。

### local_svgs

本地 svg 的路径, 配置此项后在路径中添加 svg 文件即可。支持渐变图标（iconfont 官网不能上传渐变图标）。

**注 1: 暂不支持 `color` 参数**
<br>
**注 2: 如果启用该功能，请确保`react-native-svg`的版本`>=9.13.0`**

# Step 4

开始生成 React-Native 标准组件

```bash
npx sj-iconfont-rn
```

生成后查看您设置的保存目录中是否含有所有的图标，你可以参考[snapshots 目录](https://github.com/iconfont-cli/react-native-iconfont-cli/tree/master/snapshots)的快照文件，以区分不同模式下的图标结构。

# 使用

<br />
现在我们提供了两种引入方式供您选择：

1、使用汇总`Icon`组件：

```typescript jsx
import IconFont from "../src/iconfont";

export const App = () => {
  return (
    <View>
      <IconFont name="alipay" size={20} />
      <IconFont name="wechat" />
    </View>
  );
};
```

2、使用单个图标。这样可以避免没用到的图标也打包进 App：

```typescript jsx
import IconAlipay from "../src/iconfont/IconAlipay";
import IconWechat from "../src/iconfont/IconWechat";

export const App = () => {
  return (
    <View>
      <IconAlipay size={20} />
      <IconWechat />
    </View>
  );
};
```

### 图标尺寸

根据配置`default_icon_size`，每个图标都会有一个默认的尺寸，你可以随时覆盖。

```typescript jsx
<IconFont name="alipay" size={20} />
```

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/default-color-icon.png?raw=true)

### 图标单色

单色图标，如果不指定颜色值，图标将渲染原本的颜色。如果你想设置为其他的颜色，那么设置一个你想要的颜色即可。

**注意：如果你在 props 传入的 color 是字符串而不是数组，那么即使原本是多色彩的图标，也会变成单色图标。**

```typescript jsx
<IconFont name="alipay" color="green" />
```

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/one-color-icon.png?raw=true)

### 图标多色彩

多色彩的图标，如果不指定颜色值，图标将渲染原本的多色彩。如果你想设置为其他的颜色，那么设置一组你想要的颜色即可

```typescript jsx
<IconFont name="alipay" color={["green", "orange"]} />
```

颜色组的数量以及排序，需要根据当前图标的信息来确定。您需要进入图标组件中查看并得出结论。

![](https://github.com/fwh1990/react-native-iconfont-cli/blob/master/images/multi-color-icon.png?raw=true)

# 更新图标

当您在 iconfont.cn 中的图标有变更时，只需更改配置`symbol_url`，然后再次执行`Step 4`即可生成最新的图标组件

```bash
# 修改 symbol_url 配置后执行：
npx sj-iconfont-rn
```

欢迎使用，并给我一些反馈和建议，让这个库做的更好
