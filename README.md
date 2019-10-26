#### hello-uni
****
- 这是一个 uniapp hello word~
- 这是一个 [微信公众号](https://github.com/chenjunhua8080/wechat-mp)的h5页面~

#### *V 1.0*

###### 规划功能
- [ ] 微信网页授权
- [ ] 注册登录
- [ ] 绑定账号
- [ ] 电影推荐
- [ ] ......

###### 目录结构
```
│  App.vue //全局
│  main.js //
│  manifest.json //打包配置
│  pages.json //页面配置
│  README.md
│  service.js
│  
├─components //组件
│  │  m-input.vue
│  │  
│  └─m-icon
│          m-icon.css
│          m-icon.vue
│          
├─pages
│  ├─login
│  │      login.vue //登录
│  │      
│  ├─main
│  │      main.vue //主页
│  │      
│  ├─movie
│  │      movie.vue //电影推荐
│  │      
│  ├─pwd
│  │      pwd.vue //找回密码
│  │      
│  ├─reg
│  │      reg.vue //注册
│  │      
│  └─user
│         user.vue //用户信息
│          
├─static //图片等
│  └─img
│          home.png
│          homeHL.png
│          movie.png
│          movieHL.png
│          qq.png
│          sinaweibo.png
│          user.png
│          userHL.png
│          weixin.png
│          
├─store
│      index.js //存储的
│      
└─unpackage //打包的地方
~~~
