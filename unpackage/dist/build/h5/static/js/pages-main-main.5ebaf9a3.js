(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-main-main"],{"59a0":function(e,i,t){"use strict";t.r(i);var n=t("77f2"),a=t("db7a");for(var o in a)"default"!==o&&function(e){t.d(i,e,function(){return a[e]})}(o);t("9820");var u=t("2877"),s=Object(u["a"])(a["default"],n["a"],n["b"],!1,null,"67fba7be",null);i["default"]=s.exports},"77f2":function(e,i,t){"use strict";var n=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("v-uni-view",{staticClass:"content"},[e.hasLogin?t("v-uni-view",{staticClass:"hello"},[t("v-uni-view",{staticClass:"title"},[e._v("您好 "+e._s(e.userName)+"，您已成功登录。")]),t("v-uni-view",{staticClass:"ul"},[t("v-uni-view",[e._v("这是 uni-app 带登录模板的示例App首页。")]),t("v-uni-view",[e._v("在 “我的” 中点击 “退出” 可以 “注销当前账户”")])],1)],1):e._e(),e.hasLogin?e._e():t("v-uni-view",{staticClass:"hello"},[t("v-uni-view",{staticClass:"title"},[e._v("您好 游客。")]),t("v-uni-view",{staticClass:"ul"},[t("v-uni-view",[e._v("这是 uni-app 带登录模板的示例App首页。")]),t("v-uni-view",[e._v("在 “我的” 中点击 “登录” 可以 “登录您的账户”")])],1)],1)],1)},a=[];t.d(i,"a",function(){return n}),t.d(i,"b",function(){return a})},9820:function(e,i,t){"use strict";var n=t("e26f"),a=t.n(n);a.a},ae70:function(e,i,t){i=e.exports=t("2350")(!1),i.push([e.i,".hello[data-v-67fba7be]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.title[data-v-67fba7be]{color:#8f8f94;margin-top:%?50?%}.ul[data-v-67fba7be]{font-size:%?30?%;color:#8f8f94;margin-top:%?50?%}.ul>uni-view[data-v-67fba7be]{line-height:%?50?%}",""])},db7a:function(e,i,t){"use strict";t.r(i);var n=t("e2d2"),a=t.n(n);for(var o in n)"default"!==o&&function(e){t.d(i,e,function(){return n[e]})}(o);i["default"]=a.a},e26f:function(e,i,t){var n=t("ae70");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=t("4f06").default;a("6116c2ef",n,!0,{sourceMap:!1,shadowMode:!1})},e2d2:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=t("2f62"),a={computed:(0,n.mapState)(["forcedLogin"]),data:function(){return{hasLogin:!1,userName:""}},onLoad:function(){},onShow:function(){this.hasLogin=uni.getStorageSync("hasLogin"),this.userName=uni.getStorageSync("userName"),console.log(this.hasLogin)},onPullDownRefresh:function(){console.log("refresh"),setTimeout(function(){uni.stopPullDownRefresh()},1e3)}};i.default=a}}]);