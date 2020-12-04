# vue3.0 模板

> 模板包含：【vue3.0、typescript、less、element-plus、vue-router、vuex】

## 注意

>其中less编译需要注意，package.json 里面的依赖不能导入在dependencies里面，而应该导入在devDependencies里面,
>不然则会报错，亲测有效

如下：

```json
{
  "name": "v3",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
  },
  "devDependencies": {
    "less": "^3.12.2"
  }
}
```