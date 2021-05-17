const App = getApp()
import fetch from '../../utils/fetch'
import Request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showHeader:true,
        city:"长沙",
        swiperList:[
            {img:"/public/test/1.jpg",id:1},
            {img:"/public/test/2.jpg",id:2},
            {img:"/public/test/3.jpg",id:3}
        ],
        currentSwiper:0,
        categoryList:[
            {img:"/public/static/cosmeticsImg/huazhuangpin-chunxianbi-cosmetics.png",name:"1",index:"1"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-fenbinghe-cosmetics.png",name:"2",index:"2"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-gelishuang-cosmetics.png",name:"3",index:"3"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-hushoushuang-cosmetics.png",name:"4",index:"4"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-jinghua-cosmetics.png",name:"5",index:"5"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-kouhongchuncai-cosmetics.png",name:"6",index:"6"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-ruyerushuang-cosmetics.png",name:"7",index:"7"},
            {img:"/public/static/cosmeticsImg/huazhuangpin-zhijiayoumakeup-cosmet.png",name:"8",index:"8"}
        ],
        productList :[
            {img:"/public/test/goods/p1.jpg",name:"名称",price:"1000",slogan:"1235",goods_id:"1"},
            {img:"/public/test/goods/p10.jpg",name:"名称",price:"2000",slogan:"1235",goods_id:"2"},
            {img:"/public/test/goods/p2.jpg",name:"名称",price:"100",slogan:"1235",goods_id:"3"},
            {img:"/public/test/goods/p3.jpg",name:"名称",price:"300",slogan:"1235",goods_id:"4"},
            {img:"/public/test/goods/p4.jpg",name:"名称",price:"80",slogan:"1235",goods_id:"5"},
            {img:"/public/test/goods/p5.jpg",name:"名称",price:"1000",slogan:"1235",goods_id:"6"},
            {img:"/public/test/goods/p6.jpg",name:"名称",price:"200",slogan:"1235",goods_id:"7"},
            {img:"/public/test/goods/p7.jpg",name:"名称",price:"100",slogan:"1235",goods_id:"8"},
            {img:"/public/test/goods/p8.jpg",name:"名称",price:"100",slogan:"1235",goods_id:"9"},
            {img:"/public/test/goods/p9.jpg",name:"名称",price:"400",slogan:"1235",goods_id:"10"}
        ],
        loadingText:"没有更多了"
    },
    /**
     * 判断是否已登录
     */
    judgeWhetherLogin(){
        if(!App.globalData.token){return 1}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.judgeWhetherLogin())
        this.judgeWhetherLogin()
    },
    /**
     * 轮播图
     */
    swiperChange(event){
        this.setData({
            currentSwiper:event.detail.current
        })
    },
    /**
     * 点击跳转
     */
    __e(event){
        console.log(event)
    },
})