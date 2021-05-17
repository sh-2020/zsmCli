const App = getApp();
import {wrequest} from '../../../utils/request';
const USID = 0; 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{

        },
        textareaAtate:true  
    },

    /**
     * 生命周期函数--监听页面加载
     */
     onLoad: async function (options) {
        console.log(JSON.parse(options.userInfoObject));
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
        console.log(event)
    }
})