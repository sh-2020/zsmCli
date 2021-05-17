// pages/Components/addother/addother.js
import {wrequest} from '../../../utils/request'
//定义变量标识触发判断的元素
let inputSate;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        addType:{
            type:"string",
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputSate1:"",
        inputSate2:""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 重置按钮，清空状态
         */
        resetValue(){
            this.setData({
                inputSate1:"",
                inputSate2:""
            })
        },
        /**
         * 提交添加按钮 先进行判断是否为空，如果为空直接返回，如果不为空则根据判断是否已存在的结果进行判断是否已存在，
         * 如果都符合条件，则进行添加。 
         * @param {*} event 
         */
        async submitAddOther(event){
            if(!event.detail.value.username || !event.detail.value.phone){
                wx.showToast({
                  title: '不能为空',
                  icon:'none'
                })
                return
            }
            if(this.data.inputSate1 != 'icon-zhengque' || this.data.inputSate2 != 'icon-zhengque'){
                wx.showToast({
                  title: '已存在',
                  icon:'none'
                })
                return
            }
            let sendData = event.detail.value
            sendData['type'] = this.data.addType
            try {
                let AddResult = await wrequest({method:'GET',url:'/myselfPage/addother',data:sendData})
                console.log(AddResult)
                if(AddResult.data.status == 'err'){
                    wx.showToast({
                      title: '添加用户失败，请重试',
                      icon:"none"
                    })
                    return
                }
                this.triggerEvent('myevent',AddResult.data.data.value[0])
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * 当输入框失去焦点或者用户点击完成时触发检测所需要添加的字段内容是否已存在
         * @param {obj} event 
         */
        checkIsExist(event){
            let type = event.currentTarget.dataset.sendtype  //根据自定义属性判断是那个输入框触发事件
            if(type == 'username'){
                inputSate = 'inputSate1'
            }
            if(type == 'phone'){
                inputSate = 'inputSate2'
            }
            if(!event.detail.value){ //如果输入为空则将输入框后的小图标设置为空
                this.setData({
                    [inputSate]:''
                })
                return
            }
            this.sendMessage(event.detail.value,type);
        },
        /**
         * 检测账号或手机号码是否已存在
         * @param {str} shouldSendData 
         * @param {str} type 
         */
        async sendMessage(shouldSendData,type){
            return new Promise(async (resolve,reject)=>{
                try {
                    let checkResult = await wrequest({method:'GET',url:'/myselfPage/addother/check',data:{value:shouldSendData,type:type}})
                    if(checkResult.data.status == "no"){
                        this.setData({
                            [inputSate]:'icon-cuowu'
                        })
                    }
                    if(checkResult.data.status == 'ok'){
                        this.setData({
                            [inputSate]:'icon-zhengque'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
})

