const App = getApp()
import Util from '../../utils/util'
import fetch from '../../utils/fetch'
import Request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        setDataValue:"",
        is_show:false,
        is_show_setUserInfo:false,
        // is_show_ability:-1, //-1代表没有
        pageHight:0,
        avatarUrl:"",
        username:"sunhui",
        nick_name:"可乐加冰",
        abilityList:[
            {id:"0",name:"用户管理",icon:"icon-yonghuguanli"},
            {id:"1",name:"员工管理",icon:"icon-yuangongguanli"},
            {id:"2",name:"工资清单",icon:"icon-gongzi1"},
            {id:"3",name:"统计",icon:"icon-tongji2"}
        ],
        abilityWidth:750/3,
        otherAbilityList:[
            {id:"0",designation:"我的预约记录",icon:"/public/test/appointment.png"},
            {id:"1",designation:"我的消费记录",icon:"/public/test/consumption.png"},
            {id:"2",designation:"我的钱包",icon:"/public/test/wallet.png"},
            {id:"3",designation:"所有工作人员信息",icon:"/public/test/peopleInfo.png"},
        ]
    },
    outPage(e){
        this.setData({
            is_show:false,
            is_show_setUserInfo:false,
            // is_show_ability:-1,
            nick_name:App.globalData.userInfo.nick_name,
            username:App.globalData.userInfo.username,
            avatarUrl:App.globalData.userInfo.avatarUrl,
        })
    },
    showAbilityComponents(event){
        // console.log(event.currentTarget.dataset.ability)
        if(event.currentTarget.dataset.ability == 1){
            wx.navigateTo({
              url: '/pages/packageA/userManage/userManage',
            })
        }
    },
    /**
     * 获取页面个人主页内容
     * @param {is_admin} options 权限等级
     */
    async getAbilityInfo(grade){
        let FindResult = await Request.wrequest({method:"GET",url:"/abilityInfo",data:{grade:grade}})
        return FindResult.data.value;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let height = wx.getSystemInfoSync().windowHeight;
        this.setData({
            pageHight:height
        })
        if(!Util.judgeWhetherLogin()){
            let result = await Util.showModal({content:"未登录，是否登录",showCancel:true})
            if(result.whether == "ok" && result.value){
                wx.navigateTo({
                  url: '../../pages/register/register',
                })
            }
            if(result.whether == "ok" && !result.value){ //如果点取消则渲染默认数据
                this.setData({
                    nick_name:"游客",
                    username:"",
                    avatarUrl:"",
                    abilityList:[]
                })
            }
        }
        if(Util.judgeWhetherLogin()){
            try {
                let result =await this.getAbilityInfo(App.globalData.userInfo.is_admin)
                // console.log(result)
                this.setData({
                    nick_name:App.globalData.userInfo.nick_name,
                    username:App.globalData.userInfo.username,
                    avatarUrl:App.globalData.userInfo.avatarUrl,
                    abilityList:result
                })
            } catch (error) {
                console.log(error)
            }
            
        }
    },
    /**
     * 修改信息
     * @param {*} event 
     */
    setUserInfo(event){
        this.setData({
            is_show:true,
            is_show_setUserInfo:true,
            setDataValue:event.currentTarget.dataset.userinfo
        })
    },
})
