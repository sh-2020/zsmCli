import Validate from '../../utils/Validate.js'
import Request  from '../../utils/request.js'
const app = getApp()
const headUrl = app.globalData.globalUurl;
// import wxValidate from '../../utils/Validate.js'
let rules = [{
    name:"username",
    rules:[{required:true,message:"用户名不能为空"},{account:true,message:"账号格式为4-16位，包含数字，字母，下划线"}]
},{
    name:"phone",
    rules:[{required:true,message:"手机号码不能为空"},{mobile:true,message:"手机格式不正确"}]
},{
    name:"pwd",
    rules:[{required:true,message:"密码不能为空"},{pwd:true,message:"密码格式不正确，密码格式为6-16位包含字母数字下划线减号"}]
},{
    name:"isSome",
    rules:{match:true,message:"两次输入密码不一致"}
}
]
//初始化验证器
const validate = new Validate(rules);

Page({
    data:{
        register_state:{
            username : {
                icon_style : "icon-cuowu",
                icon_show :true
            },
            phone : {
                icon_style : "icon-cuowu",
                icon_show : true
            },
            pwd : {
                icon_style : "icon-cuowu",
                icon_show : true
            },
            newPwd : {
                icon_style : "icon-cuowu",
                icon_show : true
            }
        },
        formDate:{
            username:"",
            phone:"",
            pwd:"",
            newPwd:""
        },
    },
    //设置数据
    setInputData(header,name,data){
        let str = `${header}.${name}`
        this.setData({
            [str]:data
        })
    },
    //设置没有数据时图标
    setZeroData(name){
        let styleStr = `register_state.${name}.icon_style`;
        let showStr = `register_state.${name}.icon_show`;
        this.setData({
            [styleStr]:"icon-cuowu",
            [showStr]:true
        })
    },
    //设置正确时图标显示
    setTrueIcon(name){
        let styleStr = `register_state.${name}.icon_style`;
        let showStr = `register_state.${name}.icon_show`;
        this.setData({
            [styleStr]:"icon-zhengque",
            [showStr]:false
        })
    },
    setErrIcon(name,errMsg){
        wx.showToast({
          title: errMsg,
          icon:`none`
        })
        let styleStr = `register_state.${name}.icon_style`;
        let showStr = `register_state.${name}.icon_show`;
        this.setData({
            [styleStr]:"icon-cuowu",
            [showStr]:false
        })
    },
    //绑定输入数据
    bindInput(e){
        switch(e.currentTarget.dataset.inputname){
            case "username":
                if(!e.detail.value){
                    this.setZeroData("username")
                }
                this.setInputData("formDate",e.currentTarget.dataset.inputname,e.detail.value);
                break;
            case "phone":
                if(!e.detail.value){
                    this.setZeroData(e.currentTarget.dataset.inputname)
                }
                this.setInputData("formDate",e.currentTarget.dataset.inputname,e.detail.value);
                break;
            case "pwd":
                if(!e.detail.value){
                    this.setZeroData(e.currentTarget.dataset.inputname)
                }
                this.setInputData("formDate",e.currentTarget.dataset.inputname,e.detail.value);
                break;
            case "newPwd":
                if(!e.detail.value){
                    this.setZeroData(e.currentTarget.dataset.inputname)
                }
                this.setInputData("formDate",e.currentTarget.dataset.inputname,e.detail.value);
                break;
        }
    },
    //判断账号是否已经存在
    checkAccount(e){
        let that = this;
        if(!that.data.formDate.username){
            return
        }
        try {
            validate.check("username",that.data.formDate.username,(res)=>{
                if(!res.code){
                    that.setErrIcon("username",res.msg)
                }
                if(res.code){
                    wx.request({
                      url: headUrl+'/checkUserInfo',
                      data:{username:e.detail.value},
                      method:"GET",
                      responseType:"text",
                      success(res){
                        if(res.data.data.value){
                            that.setTrueIcon("username")
                        }
                        if(!res.data.data.value){
                            that.setErrIcon("username","用户名已存在");
                        }
                      }
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    async sendPhone(){
        let that = this
        let data = {phone:that.data.formDate.phone}
        return new Promise(async (resolve,reject)=>{
            let result = await Request.request.post("/checkUserInfo",data)
            if(!result.data.data.value){
                resolve(0)
            }
            if(result.data.data.value){
                resolve(1)
            }
        })
    },
    //判断是否符合规则
    async checkResult(e){
        if(!e.detail.value){return}
        if(e.currentTarget.dataset.inputname == "phone"){ //判断phone是否存在
            let checkPhoneResult = await this.sendPhone();
            if(checkPhoneResult == 0){
                this.setErrIcon(`${e.currentTarget.dataset.inputname}`,"手机号码");
                return;
            }
        }
        if(e.currentTarget.dataset.inputname == "newPwd"){
            try {
                let result = await validate.check('isSome',[this.data.formDate.pwd,e.detail.value]);
                if(!result.code){this.setErrIcon(`${e.currentTarget.dataset.inputname}`,result.msg);return;}
            } catch (error) {}
        }
        try {
            let res = await validate.check(`${e.currentTarget.dataset.inputname}`,e.detail.value);
            if(!res.code){this.setErrIcon(`${e.currentTarget.dataset.inputname}`,res.msg)}
            if(res.code){this.setTrueIcon(`${e.currentTarget.dataset.inputname}`)}
        } catch (error) {}
    },
    //提交注册
    async sendUserRegisterInfo(e){
        //判断数据是否为空
        let that = this;
        for(let element in that.data.formDate){
            if(element == "newPwd"){
                if(that.data.formDate[element] != that.data.formDate["pwd"]){
                    wx.showToast({
                      title: '两次密码不一致',
                      icon:'none'
                    })
                }
            }
            try {
                let res = await validate.check(element,that.data.formDate[element]);
                if(!res.code){
                    that.setErrIcon(element,that.data.formDate[element],res.msg);
                    return
                }
            } catch (error) {
                wx.showToast({
                  title: '不能为空',
                  icon:'none'
                })
                return
            }
        }
        //发起请求
        let result = await Request.request.post('/register',that.data.formDate);
        if(result.statusCode == 201){
            app.globalData.userInfo = result.data.data.value;
            app.globalData.token = result.data.token
            wx.switchTab({
              url: '../../pages/index/index',
            })
            return
        }
        if(result.statusCode == 400){
            wx.showToast({
              title: '注册错误请重试',
              icon:"none"
            })
            wx.navigateTo({
              url: '../../pages/register/register',
            })
            return
        }
    }
})
