const App = getApp();
import {wrequest} from '../../../utils/request';
const USID = 0; 

let pwd = '';

let newPwd = ''

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{

        },
        textareaAtate:true,
        is_show_pwd:false,
        close_but:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
     onLoad: async function (options) {
        // console.log(JSON.parse(options.userInfoObject));
        //发起请求，获取数据
        this.setData({
            userInfo:JSON.parse(options.userInfoObject)
        })
    },
    /**
     * 单机触发函数--对不同元素触发的单击函数进行不同的响应
     * @param {*} event 
     */
    _e(event){
        console.log(event);
        switch (event.currentTarget.dataset.nature) {
            case 'introduction':
                this.setData({
                    textareaAtate:false
                })
                break;
            case 'pwd':
                this.setData({
                    is_show_pwd:true,
                    close_but:true
                })
                break
        }
    },
    /**
     * 修改简介内容
     * @param {*} event 
     */
    async ModifyTheProfile(event){
        try {
            let ModifyPrefileResult = await wrequest({method:'GET',url:'/updateItr',data:{user_id:this.data.userInfo.user_id,introduction:event.detail.value}});
            if(ModifyPrefileResult.code == 1){
                wx.showToast({
                  title: '修改成功',
                  icon:'none'
                })
            }
            if(ModifyPrefileResult.code == 0){
                wx.showToast({
                  title: '修改失败',
                  icon:'none'
                })
                MPR = 'userInfo.introduction';
                this.setData({
                    [MPR]:this.data.userInfo.introduction
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    //关闭
    close__(){
        this.setData({
            is_show_pwd:false,
            close_but:false
        })
    },
    savePwd(event){
        pwd = event.detail.value //将密码保存至pwd中
    },
    saveNewPwd(event){
        newPwd = event.detail.value //将新密码保存
        console.log(event)
    },
    async sendInfo(){
        if(pwd == "" || newPwd == ""){
            wx.showToast({
              title: '请输入',
              icon:'none'
            })
            return;
        }
        if(pwd != newPwd){
            wx.showToast({
              title: '请保持两次输入一致',
              icon:'none'
            })
            return;
        }
        try {
            let ChangeTresult = await wrequest({method:'POST',url:'/ModifyPwd',data:{id:this.data.userInfo.id,pwd:newPwd}});
            console.log(ChangeTresult)
            if(ChangeTresult.data.code == 1){
                wx.showToast({
                  title: '修改成功',
                  icon:'none'
                })
                this.setData({
                    is_show_pwd:false,
                    close_but:false
                })
            }
            if(ChangeTresult.data.code == 0){
                wx.showToast({
                  title: '修改失败',
                  icon:'none'
                })
            }
        } catch (error) {
            wx.showToast({
              title: '系统错误',
              icon:'none'
            })
            console.log(error)
        }
    }
})