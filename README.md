# mall-miniapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 组件使用
- 只要组件命名符合pages.json中easycom的命名规则都无需引入和注册可以直接使用，可以手动修改easycom的命名规则
- 如有第三方组件需求，建议使用uni-app组件市场的组件：https://ext.dcloud.net.cn/，vue语法开发可跨平台

### 路由相关
- 使用了第三方的一个路由拦截的包`uni-simple-router`可以拦截任意页面的跳转包括用户触发的原生tab切换
- 切换页面可以使用router相关api，传参数更加方便

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
