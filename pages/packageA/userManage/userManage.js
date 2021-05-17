const App = getApp()
import {wrequest} from "../../../utils/request"
const colorList = ["#d9d9d9","#ffc069","#d3f261","#40a9ff","#b37feb","#ffadd2","#bae7ff","#95de64","#d9f7be","#fff566","#ffccc7","#85a5ff","#efdbff","#f5f5f5"]
//初始加载开始位置id
let nextId = 0;
//用户列表
let userList = []
//用户列表渲染方式
let sorting = true
//输入标志，判断搜索框是否为第一次输入
let flage = 0;
//是否到达底部刷新刷新标志 当值为1时到达底部不继续刷新
let GODOWNFLG = 0;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        is_show:true,
        userList:[
            {id:0,user_id:"oMPD25eyjzby2BD_v4otd89HQQNs",nick_name:"可乐加冰",phone:"18873976468",username:"sunhui",province:'湖南',city:"邵阳",address:"隆回县",avatarUrl:"http://127.0.01:8888/static/upload/c6633b05fbbafe6c1d9c44d0fd06178d.jpeg",color:"#d9d9d9"},
            {id:0,user_id:"oMPD25eyjzby2BD_v4otd89HQQNs",nick_name:"可乐加冰",phone:"18873976468",username:"sunhui",province:'湖南',city:"邵阳",address:"隆回县",avatarUrl:"http://127.0.01:8888/static/upload/c6633b05fbbafe6c1d9c44d0fd06178d.jpeg",color:"#40a9ff"},
            {id:0,user_id:"oMPD25eyjzby2BD_v4otd89HQQNs",nick_name:"可乐加冰",phone:"18873976468",username:"sunhui",province:'湖南',city:"邵阳",address:"隆回县",avatarUrl:"http://127.0.01:8888/static/upload/c6633b05fbbafe6c1d9c44d0fd06178d.jpeg",color:"#b37feb"}
        ],
        is_show_NOUSER:false,
        sorting:true,
        is_show_cloth:false,
        is_show_add:false,
        is_show_close:false,
        searchData:"请输入昵称，电话号码，账号",
    },
    /**
     * 当搜索框获取焦点时清除初始内容
     */
    onfocus(){
        if(flage == 0){
            this.setData({
                searchData:""
            })
        }
    },
    /**
     * 绑定输入数据
     * @param {*} event 
     */
    onInput(event){
        flage = 1
        this.setData({
            searchData:event.detail.value
        })
    },
    /**
     * 发送搜索数据
     */
    async sendSearch(){
        if(!this.data.searchData){
            GODOWNFLG = 0;
            if(sorting){
                nextId = 0
            }else{
                nextId = 100000000
            }
            userList = []
            this.getUserList();
            return
        }
        try {
            let searchResult = await wrequest({method:'GET',url:'/userManage/search',data:{keyWord:this.data.searchData,type:'user'}});
            userList = [];
            GODOWNFLG = 1;
            if(searchResult.data.status == 'ok'){
                for(const item of searchResult.data.data){
                    this.setColor(item);
                    userList.push(item);
                    this.setData({
                        userList:userList
                    })
                }
            }
            if(searchResult.data.status == 'half'){ //如果没有用户则显示一张没有的字
                this.setData({
                    is_show_NOUSER:true
                })
            }
            if(searchResult.data.status == 'no'){
                wx.showToast({
                  title: '服务器错误请重试',
                  icon:'none'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * 改变列表刷新的方式 data中sorting为true 代表使用升序 false 使用降序
     */
    changeSort(){
        if(sorting){
            nextId = 100000;
        }else{
            nextId = 0;
        }
        sorting = !sorting
        this.setData({
            sorting:!this.data.sorting
        })
        this.getUserList()
    },
    /**
     * 添加颜色属性
     * @param {obj} obj 
     */
    setColor(obj){
        let num =  Math.round(Math.random()*colorList.length)
        obj['color'] = colorList[num]
    },
    /**
     * 保存所到达的id
     * @param {obj} obj 
     */
    saveNextId(obj){
        if(sorting){
            if(obj.id > nextId){
                nextId = obj.id
            }
        }
        else{
            if(obj.id < nextId){
                nextId = obj.id
            }
        }
    },
    /**
     * 获取用户列表
     */
    async getUserList(){
        try {
            let result = await wrequest({method:'GET',url:'/getUserList',data:{id:nextId,type:sorting}});
            // console.log(result)
            if(result.data.status == 'ok'){
                for(const item of result.data.data){
                    this.saveNextId(item)
                    this.setColor(item)
                    userList.push(item)
                    this.setData({
                        userList:userList
                    })
                }
            }
            if(result.data.status == 'half'){ //如果没有用户则显示一张没有的字
                this.setData({
                    is_show_NOUSER:true
                })
            }
            if(result.data.status == 'no'){
                wx.showToast({
                  title: '服务器错误请重试',
                  icon:'none'
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(App.globalData.userInfo)
        if(App.globalData.userInfo.is_admin == 1){
            this.setData({
                is_show:true
            })
        }
    },
    onHide(){
        nextId = 0,
        this.setData({
            is_show_NOUSER:false
        })
    },
    onShow(){
        this.getUserList()
    },
    /**
     * 用户下拉触底时触发 加载后面数据
     */
    onReachBottom(){
        if(GODOWNFLG == 1){
            return
        }
        this.getUserList()
    },
    // onPullDownRefresh(){
    //     this.getUserList()
    // },
    addUser(){
        this.setData({
            is_show_cloth:true,
            is_show_add:true,
            is_show_close:true
        })
    },
    close_(){
        this.setData({
            is_show_cloth:false,
            is_show_add:false,
            is_show_close:false,
            IS_SHOW_DETAIL:false
        })
    },
    addEvent(event){
        this.setData({
            is_show_cloth:false,
            is_show_add:false,
            is_show_close:false
        })
        console.log(event)
        userList.unshift(event.detail)
        this.setData({
            userList:userList
        })
    },
    checkTheManageDetails(event){
        this.getCorrespondingId(event.currentTarget.dataset.cid)
    },
    //获取对应id信息
    async getCorrespondingId(id){
        try {
            const MsgGainResult = await wrequest({method:'GET',url:'/getUserInfoFromID',data:{cid:id}});
            MsgGainResult.data.data['id'] = id;
            //获取信息成功则跳转至页面，并将数据发送过去
            if(MsgGainResult.statusCode == 200 && MsgGainResult.data.status == 'yes'){
                wx.navigateTo({
                    url: `/pages/packageA/infoDetails/infoDetails?userInfoObject=${JSON.stringify(MsgGainResult.data.data)}`,
                  })
            }
            if(MsgGainResult.statusCode == 200 && MsgGainResult.data.status == 'no'){
                wx.showToast({
                  title: MsgGainResult.data.data,
                  icon:"none"
                })
            }
            if(MsgGainResult.statusCode == 200 && MsgGainResult.data.status == 'no'){
                wx.showToast({
                  title: MsgGainResult.data.data,
                  icon:"none"
                })
            }
            if(MsgGainResult.statusCode == 500 && MsgGainResult.data.status == 'err'){
                wx.showToast({
                    title: '服务器错误',
                    icon:"none"
                  })
            }
        } catch (error) {
            wx.showToast({
              title: '出现错误，请重试',
              icon:"none"
            })
            console.log(error);
        }
    }
})
