// pages/register/register.js
const Validate = require('../../utils/Validate')

Page({
    data:{
        register_state:{
            account : {
                icon_style : "icon-cuowu",
                icon_show :true
            },
            tel : {
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
            account:"",
            tel:"",
            pwd:"",
            newPwd:""
        },
    }
    
})