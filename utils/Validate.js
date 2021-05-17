class Validate{
    constructor(rules,data,...params){
        if ( !(rules instanceof Array)){
            throw new Error(`Validate错误传入规则参数需为数组形式`);
        }
        this.rules = rules;
    };
    //保存自定义规则
    saveCustomize = []
    // 内置规则
    rulesName = ["required", "email", "qq", "money", "url", "id", "lengthRange", "fixedLength", "payPwd", "notMatch", "match", "realname", "receiptname", "chinese", "safeAnswer", "alphanumeric", "idcard", "mobile", "phone", "areaPart", "phonePart", "year", "month", "day", "number", "notAllNum", "maxValue", "minValue", "integer", "rate", "minNumber","pwd","account"];
    // 定义规则
    rulesMessage = {
        required: {
            regex: /[^(^\s*)|(\s*$)]/,
            msg: "此项必填"
        },
        email: {
            regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            msg: "邮箱格式不正确。参考格式: wzp@upg.cn"
        },
        qq: {
            regex: /^\d+$/,
            msg: "qq号码必须是1位以上的数字"
        },
        money: {
            regex: /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
            msg: "金额格式不符，仅允许输入数字和小数点，并最多输入两位小数，如1000.00"
        },
        url: {
            regex: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
            msg: "链接格式不正确。参考格式：http://www.ifsc.com.cn"
        },
        id: {
            regex:/[^(^\s*)|(\s*$)]/,
            msg: "此项必填"
        },
        lengthRange: {
            num:2,
            msg: "长度为 #0# 到 #1# 位"
        },
        fixedLength: {
            num:1,
            msg: "长度必须为#0#位"
        },
        payPwd: {
            num:1,
            msg: "支付密码必须为#0#位数字！"
        },
        notMatch: {
            num:5,
            msg: "please enter a value different from '#0#'"
        },
        match: {
            flag:1,
            msg: "请保证两次输入一致"
        },
        realname: {
            regex: /^[\u0391-\uFFE5A-Za-z0-9]+$/,
            msg: "中文,英文, 0-9"
        },
        receiptname: {
            regex: /^[\u0391-\uFFE5A-Za-z]+$/,
            msg: "中文,英文"
        },
        chinese: {
            regex: /^[\u4e00-\u9fa5]+$/,
            msg: "格式错误"
        },
        //安全问答的验证
        safeAnswer: {
            regex: /^[\u0391-\uFFE5A-Za-z0-9\s]+$/,
            msg: "答案只允许中文、英文、数字"
        },
        alphanumeric: {
            regex: /^[A-Za-z0-9_-]+$/,
            msg: "英文, 0-9, - and _"
        },
        idcard: {
            msg: "身份证号码错误"
        },
        mobile: {
            // regex: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){10,12})+$/,
            regex: /^[1][3,4,5,7,8]\d{9}$/,
            msg: "手机号码格式错误"
        },
        phone: {
            //regex: /^((\d{11,12})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
            regex: /^((\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})$)$/,
            msg: "座机号码格式错误,格式 0571-88888888"
        },
        // 验证座机区号
        areaPart: {
            // 匹配区号0开头的3位或4位数字
            regex: /^0\d{2}$|^0\d{3}$/,
            msg: "区号格式错误"
        },
        // 验证座机号，不包括区号
        phonePart: {
            // 匹配电话号码为7位或8位数字
            regex: /^((\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})$)$/,
            msg: "座机号码格式错误"
        },
        year: {
            regex: /^[1,2][0,9]\d{2}$/,
            msg: "年格式填写错误！"
        },
        month: {
            regex: /^[0,1]\d{1}$|^\d{1}$/,
            msg: "月格式填写错误！"
        },
        day: {
            regex: /^[0,1,2,3]\d{1}$|^\d{1}$/,
            msg: "日格式填写错误！"
        },
        number: {
            regex:/^[0-9]*$/,
            msg: "此项为数字格式"
        },
        notAllNum: {
            regex: /^\d+$/,
            msg: "不能全为数字"
        },
        maxValue: {
            num:3,
            msg: "请输入数字小于  #0#"
        },
        minValue: {
            num:4,
            msg: "请输入数字大于  #0#"
        },
        integer: {
            regex: /^[1-9]\d*$/,
            msg: "请输入正整数"
        },
        // 利率判断 eg: 43 | 32. | 32.1 | 32.33
        rate: {
            regex: /^\d{1,2}(\.\d{1,2}?)?$/,
            msg: "请输入有效数字"
        },
        // 最小金额
        minNumber: {
            regex: /^\d*(\.(\d{1,2})?)?$/,
            msg: "请输入大于等于 #0# 数字"
        },
         //判断密码格式是否正确 （6-16位包含字母数字_-
         pwd:{
            regex:/^[\w_-]{6,16}$/,
            msg:"密码格式不正确"
        },
        //判断账号格式是否正确
        account:{
            regex:/^[-_a-zA-Z0-9]{4,16}$/,
            msg:"账号格式不正确"
        },
    };
    check(name,value,callback){
        if(!name) {
            throw new Error("Validate.check(name,value) name 不能为空")
        }
        if(!value) {
            throw new Error("Validate.check(name,value) value 不能为空")
        }
        return new Promise((resolve,reject)=>{
            if(this.saveCustomize.indexOf(name) != -1){
                let result =  this[name](value)
                resolve(result)
                return callback(result)
            }
            //创建对象量储存message值
            let saveRulesMessage = {};
            //创建数组保存规则
            let saveRulesName = {};
            
            for (const rules_ of this.rules){
                if (rules_.name == name){
                    if(rules_.rules instanceof Array) {
                        for(const rules_rules of rules_.rules){
                            this.saveRules(rules_rules,saveRulesMessage,saveRulesName);
                        }
                    }else{
                        this.saveRules(rules_.rules,saveRulesMessage,saveRulesName);
                    }
                }
            }
            // console.log(saveRulesMessage);
            // console.log(saveRulesName)
            if(saveRulesName.length == 0) {
                reject(0)
                return
            }
            let result = this.checkRegulation(saveRulesMessage,saveRulesName,value)
            resolve(result)
            callback(result)
        })
    };
    //保存对应规则
    saveRules(rulesObject,saveRulesMesObj,saveRulesNme) {
        for (const checkRules of Object.keys(rulesObject)){
            if (this.rulesName.indexOf(checkRules) != -1){
                saveRulesMesObj[checkRules] = rulesObject.message;
                saveRulesNme[checkRules] = rulesObject[checkRules];
            }
        }
    };
    //验证规则
    checkRegulation(message,rules,value) {
        // console.log(rules)
        let rulesArray = Object.keys(rules)
        for (const rulesVal of rulesArray) {
            if(this.rulesMessage[rulesVal].regex && !this.rulesMessage[rulesVal].num){
                let result =  this.checkRegular(this.rulesMessage[rulesVal].regex,value)
                if(result.code == 1){
                    continue
                }
                if(result.code == -1){
                    if(message[rulesVal]){
                        return {
                            code : false,
                            msg : message[rulesVal]
                        }    
                    }
                    return {
                        code : false,
                        msg : this.rulesMessage[rulesVal].msg
                    }
                }
            }
            if(rulesVal == "idcard"){
                let result = this.validatorIDCard(value)
                if(result.code == 1){
                    continue
                }
                if(message[rulesVal]){
                    return {
                        code : false,
                        msg : message[rulesVal]
                    }    
                }
                return {
                    code : false,
                    msg : result
                } 
            }
            if(this.rulesMessage[rulesVal].num && !this.rulesMessage[rulesVal].regex){
                // console.log(this.#rulesMessage[rulesVal].num,rulesVal)
                let result = this.checkNum(rules[rulesVal],value,this.rulesMessage[rulesVal].num)
                console.log(result)
                if(result.code == 1) {
                    let mag = this.rulesMessage[rulesVal].msg
                    let replaceResult =  this.replaceStr(mag,rules[rulesVal])
                    if(message[rulesVal]){
                        return {
                            code : false,
                            msg : message[rulesVal]
                        }    
                    }
                    return {
                        code : false,
                        msg : replaceResult
                    } 
                }
            }
            if(this.rulesMessage[rulesVal].flag){
                if(rulesVal== "match"){
                    if(!(value instanceof Array)) {
                        throw new Error(`在match规则下，value需要传入一个含两次输入的结果数组，validate.check(name,!!!)|->x需要-个数组`)
                    }
                    if(!(value.length == 2)){
                        throw new Error(`在match规则下，value需要传入一个含两次输入的结果的两个元素的数组，validate.check(name,!!!)|->x数组需要两个元素`)
                    }
                    if(value[0] != value[1]){
                        if(message[rulesVal]){
                            return {
                                code : false,
                                msg : message[rulesVal]
                            }    
                        }
                        return {
                            code : false,
                            msg : this.rulesMessage[rulesVal].msg
                        }
                    }
                }
            }
        }
        return {
            code : true,
            msg : "验证成功"
        }
    };
    //判断有正则的规则
    checkRegular(regex,value){
        if(regex){
            let result = regex.test(value)
            return {code : result ? 1:-1}
        }
    };
    //判断需要输入值的规则
    checkNum(num,value,kind){
        switch(kind){
            //值必须为多少位
            case 1:
                return {code : num == value.length ? 1:-1} 
            //长度在范围 x-y 之间
            case 2:
                return {code: value.length<num[0] || value.length>num[1] ? -1 :1 }
            //输入数字小于 x 
            case 3:
                return {code : value < num ? 1 : -1}
                // return {code : this.#compareNum(value,num,2) ? 1 : -1 }
            //输入数字大于x
            case 4:
                // return {code : this.#compareNum(value,num,1) ? 1 : -1 }
                return {code : value > num ? 1 : -1}
            //输入与xxx不同
            case 5:
                return {code : value === num ? -1 :1}
        }
    };
    //判断身份证是否合法
    validatorIDCard(idcode) {
        if (typeof idcode !== 'string') {
          return {
            code: -1,
            msg: "为了避免javascript数值范围误差，idcode 必须是字符串"
          }
        }
        const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        // 判断格式是否正确
        const format = idcard_patter.test(idcode);
        if (!format) {
          return {
            code: -1,
            msg: "身份证号码格式错误"
          }
        }
        // 加权因子
        const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验码
        const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        const last = idcode[17];//最后一位
        const seventeen = idcode.substring(0, 17);
        // ISO 7064:1983.MOD 11-2
        // 判断最后一位校验码是否正确
        const arr = seventeen.split("");
        const len = arr.length;
        let num = 0;
        for (let i = 0; i < len; i++) {
          num += arr[i] * weight_factor[i];
        }
        // 获取余数
        const resisue = num % 11;
        const last_no = check_code[resisue];
        // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
        const result = last === last_no ? true : false;
        return {
          code: result ? 1 : -1,
          msg: !result ? "身份证号码格式错误" : ""
        }
    };
    //替换字符串中#0#
    replaceStr(str,num){
        let str1 = str
        let reg = /#0#/
        if(num instanceof Array){
            for (let char of num){
                str1 = str1.replace(reg,char)
            }
            return str1
        }
        str1 = str1.replace(reg,num)
        return str1
    };
    //自定义规则
    customize(name,callback){
        this.saveCustomize.push(name)
        this[name] = callback
    };
}
module.exports = Validate  
