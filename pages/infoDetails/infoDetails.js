const App = getApp();
import {wrequest} from '../../utils/request';
//保存需要查找的用户id
const USID = 6; 
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        //发起请求，获取数据
        try {
            const MsgGainResult = wrequest({method:'GET',url:'/getUserInfoFromID',data:{cid:USID}});
            console.log(MsgGainResult);
        } catch (error) {
            console.log(error);
        }
    },
    
})