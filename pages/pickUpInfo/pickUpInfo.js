// pages/pickUpInfo/pickUpInfo.js
const App = getApp()
const headUrl = App.globalData.globalUurl;
const fetch = require("../../utils/fetch");
const Request = require("../../utils/request")
Page({
    data: {
      input_hidden:true,
      get_hiddem:false,
      input_value:"",
    },
    onLoad(){

    },
    getInfo(e){
        wx.getUserProfile({
          desc:"完善用户信息",
          success(res){
            console.log(res)
          }
        })
    },
    showModel(e){
      this.setData({
        input_hidden:!this.data.input_hidden,
        get_hiddem:!this.data.get_hiddem
      })
    },
    // getPhoneNumber(e){
    //   console.log(e)
    // },
    //设置输入数据
    setInputValue(e){
      this.setData({
        input_value:e.detail.value
      })
    },
    //添加用户信息至数据库
    async sendUserInfo(e){
        let that = this;
        //判断手机号码是否合法
        let checkTel = that.checkPhoneIsOk()
        if(checkTel == 0){
          wx.showToast({
            title:"号码不合法",
            icon:"none",
            duration:1000
          })
          this.setData({
            input_value:""
          })
          return
        }
        let sendData = App.globalData.userInfo;
        sendData['phone'] = this.data.input_value; //将电话号码添加至对象中
        let checkResult = await that.checkPhone();
        if(!checkResult){
          wx.showToast({
            title:"该号码已存在",
            icon:"none",
            duration:1000
          })
          return
        }
        fetch({
          url: headUrl+'/wSinUp',
          data:sendData,
          method:"POST",
          timeout:10000,
          success(res){
            if(res.data.status == 'ok'){
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }
            if(res.data.status == 'err'){
              wx.showToast({
                title:"出现错误，请重试",
                icon:"none",
                duration:1000
              })
              wx.switchTab({
                url: '../../pages/pickUpInfo/pickUpInfo',
              })
            }
          },
          fail(res){
            if(res.errMsg == "request:fail timeout"){ //如果响应时间超过5秒则提醒用户
              wx.showModal({
                title:"超时，请重试",
                content:"超时，请重试",
                confirmText:"确定",
                cancelText:"取消",
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../pages/pickUpInfo/pickUpInfo',
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '../../pages/pickUpInfo/pickUpInfo',
                    })
                  }
                }
              })
            }
            if(res.errMsg =="request:fail "){
              wx.showModal({
                title:"错误",
                content:"服务器错误，请重试",
                confirmText:"确定",
                cancelText:"取消",
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../pages/pickUpInfo/pickUpInfo',
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '../../pages/pickUpInfo/pickUpInfo',
                    })
                  }
                }
              })
            }
          }
        })
    },
    //判断phone是否已存在
    checkPhone(){
      let that = this
      let data = {phone:that.data.input_value}
      return new Promise(async (resolve,reject)=>{
          let result = await Request.wrequest({method:"post",url:"/checkUserInfo",data:data})
          if(!result.data.data.value){
              resolve(0)
          }
          if(result.data.data.value){
              resolve(1)
          }
      })
    },
    //判断电话号码是否合法
    checkPhoneIsOk(){
      let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      let inputStr = this.data.input_value;
      if (!(telStr.test(inputStr))) {
        return 0
      }else{
        return 1
      }
    }
})