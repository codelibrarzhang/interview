 /**
  * 名称: 当前用户账号、权限
  * 文档: http://inside-yapi.01zhuanche.com/project/949/interface/api/92889
  * 后端: 
  * 方法: GET
  * 路径: '/user/currentUser'
  **/
  export const currentUser = (params = {}, opts = {}) => {
    return Request.get(
      "/user/currentUser",
      params,
      opts
    );
  };
   /**
  * 名称: 司机端
  * 文档: http://inside-yapi.01zhuanche.com/project/853/interface/api/90297
  * 后端: 
  * 方法: GET
  * 路径: '/test'
  **/
export const test = (params = {}, opts = {}) => {
    return Request.get(
      "/test",
      params,
      opts
    );
  };

   /**
  * 名称: 活动详情
  * 文档: http://inside-yapi.01zhuanche.com/project/845/interface/api/90288
  * 后端: 
  * 方法: GET
  * 路径: '/detail'
  **/
export const detail = (params = {}, opts = {}) => {
    return Request.get(
      "/detail",
      params,
      opts
    );
  };

 /* *
* title: 活动详情
* path: "/detail"
* methods: GET
* */
SQYC.request({
    url: hostUrl + '/passenger-integral-partner/privilegeCard/getProduct',
    dataType: 'json',
    type: 'post',
    ajax_name: 'getProduct',
    data: {
        driverId: self.driverId,
        productId: item.id,
        count: 1
    }
}).then(
    function (res) {
        if (res.code === 0) {
        } else {
            self.$toast(res.msg)
        }
    },
    function () {
        self.$toast(res.msg)
    }
)
/* *
* 名称: 活动详情
* 文档: "http://inside-yapi.01zhuanche.com/project/845/interface/api/90288"
* methods: GET
* 后端: 
* 方法: GET
* 路径: '/detail'
* */
SQYC.request({
    url: hostUrl + '/detail',
    dataType: 'json',
    type: 'GET',
    ajax_name: 'getProduct',
    data: {
    }
}).then(
    function (res) {
        if (res.code === 0) {
        } else {
            self.$toast(res.msg)
        }
    },
    function () {
        self.$toast(res.msg)
    }
)


ECMA-262 第 6 版规定的所
有关键字如下：
break do in typeof
case else instanceof var
catch export new void
class extends return while
const finally super with
continue for switch yield
debugger function this
default if throw
delete import try
规范中也描述了一组未来的保留字，同样不能用作标识符或属性名。虽然保留字在语言中没有特定
用途，但它们是保留给将来做关键字用的。
以下是 ECMA-262 第 6 版为将来保留的所有词汇。
始终保留:
enum
严格模式下保留:
implements package public
interface protected static
let private
模块代码中保留:
await 

"use strict"; 

function doSomething() {
    "use strict";
    // 函数体
}
// 有效，但容易导致错误，应该避免
if (test)
 console.log(test);
// 推荐
if (test) {
 console.log(test);
}  