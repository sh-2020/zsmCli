const app = getApp()
const headUrl = app.globalData.globalUrl;
Page({
    data: {
      userInfo: {},
      username:"",
      pwd:""
    },
    //跳转至注册页面
    getToRegister(){
      wx.navigateTo({
        url: '../../pages/register/register',
      })
    },
    //设置data中账号密码
    setFormData(event){
      this.setData({
        [event.currentTarget.dataset.name]:event.detail.value
      })
    },
    //发送登录信息
    sendLoginMessage(event){
      //判断是否为空
      if(!event.detail.value.username && !event.detail.value.pwd){
        wx.showToast({
          title:"账号或密码为空",
          icon:"none",
          duration:1000
        })
        return
      }
      //保存this
      const that = this;
      //发起请求
      wx.request({
        url: headUrl+'/login',
        data:event.detail.value,
        method:"POST",
        dataType:"json",
        timeout:10000,
        success(res){
          if(res.statusCode == '204'){
            wx.hideToast()
            wx.showModal({
              title:"错误",
              content:"用户不存在，是否前往注册",
              confirmText:"确定",
              cancelText:"取消",
              success (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../../pages/register/register',
                  })
                } else if (res.cancel) {
                  that.setData({
                    username:"",
                    pwd:""
                  })
                }
              }
            })
          }
          if(res.data.token && res.data.data){
            app.globalData.token = res.data.token; //将返回的token保存至app.js globalData中
            app.globalData.userInfo = res.data.data.value[0]; //保存用户信息
            that.setData({
              userInfo:res.data.data
            })
            wx.switchTab({
              url: '../../pages/index/index',
            })
          }
        } ,
        fail(res){
          if(res.errMsg == "request:fail timeout"){ //如果响应时间超过5秒则提醒用户
            wx.showModal({
              title:"登录超时，请重试",
              content:"登录超时，请重试",
              confirmText:"确定",
              cancelText:"取消",
              success (res) {
                if (res.confirm) {
                  that.sendLoginMessage({detail:{value:{username:that.data.username,pwd:that.data.pwd}}})
                } else if (res.cancel) {
                  that.setData({
                    username:"",
                    pwd:""
                  })
                }
              }
            })
          }
          if(res.errMsg =="request:fail "){
            wx.showModal({
              title:"错误",
              content:"服务器，请重试",
              confirmText:"确定",
              cancelText:"取消",
              success (res) {
                if (res.confirm) {
                  that.sendLoginMessage({detail:{value:{username:that.data.username,pwd:that.data.pwd}}})
                } else if (res.cancel) {
                  that.setData({
                    username:"",
                    pwd:""
                  })
                }
              }
            })
          }
        }
      })
      wx.showToast({
        title:"登录中",
        icon:"loading",
        duration:10000
      })
    },
    wxlogin(){
      let that = this;
      wx.login({
        timeout: 10000,
        success(res){
          wx.request({
            url: headUrl+'/wx_login',
            data:{code:res.code},
            method:"GET",
            timeout:10000,
            success(res){
              if(res.data.token){
                app.globalData.token = res.data.token; //将返回的token保存至app.js globalData中
                app.globalData.openid = res.data.openid; //保存唯一标识
                app.globalData.userInfo = res.data.userAdmin
                if(res.data.flag == 0){  //如果第一次登陆则跳转到添加手机号码页。否则跳转到首页
                  wx.navigateTo({
                    url: '../../pages/pickUpInfo/pickUpInfo',
                  })
                }else{
                  wx.switchTab({
                    url: '../../pages/index/index',
                  })
                }
              }
            },
            fail(res){
              if(res.errMsg == "request:fail timeout"){ //如果响应时间超过5秒则提醒用户
                wx.showModal({
                  title:"登录超时，请重试",
                  content:"登录超时，请重试",
                  confirmText:"确定",
                  cancelText:"取消",
                  success (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../../pages/login/login',
                      })
                    } else if (res.cancel) {
                      wx.navigateTo({
                        url: '../../pages/login/login',
                      })
                    }
                  }
                })
              }
              if(res.errMsg =="request:fail "){
                wx.showModal({
                  title:"错误",
                  content:"服务器，请重试",
                  confirmText:"确定",
                  cancelText:"取消",
                  success (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../../pages/login/login',
                      })
                    } else if (res.cancel) {
                      wx.navigateTo({
                        url: '../../pages/login/login',
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    //获取信息
    wGetuserInfoAndLogin(e){
        let that = this;
        wx.getUserProfile({
          desc:"完善用户信息",
          success(res){
            app.globalData.userInfo = res.userInfo;
            that.setData({
              userInfo:res.userInfo
            })
            that.wxlogin()
          },
          fail(res){
            if(res.errMsg == "getUserProfile:fail auth deny"){
              app.globalData.userInfo = {
                address:null,
                avatarUrl:"",
                city:"",
                gender:"",
                is_admin:0,
                nick_name:"",
                phone:"",
                province:"",
                user_id:"",
                username:""
              }
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
          }
        })
    }
})
