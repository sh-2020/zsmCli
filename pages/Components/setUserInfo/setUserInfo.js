
const App = getApp()
import {translate} from '../../../utils/util'
import fileOperate from '../../../utils/fileOperate'
import {wrequest} from '../../../utils/request'
import {uploadFile} from '../../../utils/fileRequest'
import Vad from '../../../utils/Validate'
let rules = [{
    name:"username",
    rules:[{required:true,message:"用户名不能为空"},{account:true,message:"账号格式为4-16位，包含数字，字母，下划线"}]
},{
    name:"phone",
    rules:[{required:true,message:"手机号码不能为空"},{mobile:true,message:"手机格式不正确"}]
}]
const vad = new Vad(rules)
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        states:{
            type:String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // states:"",
        userInfo:{
            avatarUrl:""
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 截取地址
         * @param {*} str 
         */
        toDealWithTheAddress(str){
            let addressStr=""
            let SHIreg = /.+?(省|市|自治区|自治州|县|区)/g
            let resultArray = str.match(SHIreg)
            if(resultArray.length >=2){
                //将后面部分连接成地址
                for(let i=2;i<resultArray.length;i++){
                    addressStr = addressStr+resultArray[i]
                }
                return {
                    province:resultArray[0].slice(0,resultArray[0].length-1),
                    city:resultArray[1].slice(0,resultArray[1].length-1),
                    address:addressStr
                }
            }
        },
        /**
         * 设置用户信息值
         * @param {*} event 
         */
        async setUserInfo(event){
            const trigger = event.currentTarget.dataset.nature;
            const user_id = App.globalData.userInfo.user_id;
            let data = event.detail.value;
            if(this.data.userInfo[trigger] == data || (this.data.userInfo['province']+'省'+this.data.userInfo['city']+'市'+(this.data.userInfo.address == null ? '':this.data.userInfo.address)) == data){return}
            //判断是否符合格式
            if(trigger == 'username' || trigger == 'phone'){
                try {
                    let VadResult = await vad.check(trigger,data);
                    if(!VadResult.code){
                        wx.showToast({
                          title: '格式不合法',
                          icon:"none"
                        })
                    }
                } catch (error) {}
            }
            //处理地址
            if( trigger== 'address'){
                let addressResult = this.toDealWithTheAddress(event.detail.value);
                addressResult['user_id'] = user_id
                let setResult = await wrequest({method:"GET",url:"/ModifValue",data:addressResult})
                if(setResult.statusCode == 200 && setResult.data.status == 'ok'){
                    const provinceValue = `userInfo.province`;
                    const cityValue = `userInfo.city`;
                    const addressValue = `userInfo.address`
                    this.setData({
                        [provinceValue] : addressResult.province,
                        [cityValue] : addressResult.city,
                        [addressValue] : addressResult.address
                    })
                }
                return
            }
            if(data == '男'){
                data = 1
            }else if (data == '女'){
                data = 0
            }else if(data == '未知'){
                data = 2
            }
            let setResult = await wrequest({method:"GET",url:"/ModifValue",data:{[trigger]:data,user_id}})
            if(setResult.statusCode == 200 && setResult.data.status == 'ok'){
                const triggerValue = `userInfo.${trigger}`;
                this.setData({
                    [triggerValue] : event.detail.value
                })
            }
        },
        /**
         *上传文件
         * @param {str} path 
         */
        async operateFile(path){
            try {
                let judgeResult = await fileOperate.access({path:path});
                let upRes = await uploadFile({filePath:path,name:'userImage',url:"/userInfoImage"});
                upRes.data = JSON.parse(upRes.data)
                console.log(upRes)
                if(upRes.data.status == 'ok'){
                    let str = 'userInfo.avatarUrl'
                    this.setData({
                        [str]:path
                    })
                    wx.showToast({
                      title: '修改头像成功',
                      icon:'none'
                    })    
                }
                if(upRes.data.status == 'no'){
                    wx.showToast({
                      title: '修改头像失败',
                      icon:'none'
                    })
                }
            } catch (error) {
                console.log(error)
                wx.showToast({
                  title: '错误，请重试'+error,
                  icon:"none"
                })
            }
        },
        /**
         * 选择获取照片的方式
         */
        chooseimage(){
            var that = this;
            wx.showActionSheet({
                itemList: ['从相册中选择', '拍照'],
                itemColor: "#CED63A",
                success: function (res) {
                    if (!res.cancel) {
                        if (res.tapIndex == 0) {
                            that.chooseWxImage('album')
                        } 
                        if (res.tapIndex == 1) {
                            that.chooseWxImage('camera')
                        }
                    }
                }
            })
        },
        /**
         * 获取照片
         * @param {*} type 相机or相册 
         */
        chooseWxImage: function (type) {
            var that = this;
            wx.chooseImage({
                count:1,
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                    const tempFilePaths = res.tempFilePaths
                    wx.saveFile({
                        tempFilePath: tempFilePaths[0],
                        success(res){
                            if(res.errMsg =='saveFile:ok'){
                                that.operateFile(res.savedFilePath)
                            }
                        },fail(res){
                            wx.showToast({
                              title: '保存文件失败，请重试',
                              icon:'none'
                            })
                        }
                    })
                },fail(res){
                    wx.showToast({
                      title: '打开相册失败',
                      icon:'none'
                    })
                }
            })
        },
        async getImage(event){
            this.chooseimage()
        }
    },
    lifetimes:{
        async attached(){
            let shouldTranslate = ['province','city'];
            for (let item of shouldTranslate){
                let translateResult = await translate(App.globalData.userInfo[item],'en_US','zh_CN');
                if(translateResult.code == 'ok'){
                    App.globalData.userInfo[item] = translateResult.value;
                }
                if(translateResult.code == 'no'){
                    App.globalData.userInfo[item] = App.globalData.userInfo[item];
                }
            }
            if(App.globalData.userInfo.gender == 1){
                App.globalData.userInfo.gender ="男"
            }else if(App.globalData.userInfo.gender == 0){
                App.globalData.userInfo.gender = "女"
            }else{
                App.globalData.userInfo.gender = "未知"
            }
            this.setData({
                userInfo:App.globalData.userInfo
            })
        },
    }
})
