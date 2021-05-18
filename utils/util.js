const App = getApp()
const plugin = requirePlugin("WechatSI")

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
/**
 * wx.showModal Promise包装
 * @param {object} options
 */
function showModal(parms){
    return new Promise((resolve,reject)=>{
      wx.showModal({
        content:parms.content,
        showCancel:parms.showCancel,
        confirmText:'确定',
        cancelText:"取消",
        success(res){
          if(res.confirm){
            resolve({
              whether:"ok",
              value:true
            })
          }
          else if(res.cancel){
            resolve({
              whether:"ok",
              value:false
            })
          }
        },
        fail(res){
          reject({
            whether:"no",
            value:res
          })
        }
      })  
    })
}
/**
 * 检测是否已登录
 */
function judgeWhetherLogin(){
    if(!App.globalData.token){return false}else{return true}
}
function translate(data,lfrom,lto){
  return new Promise((resolve,reject)=>{
    plugin.translate({
      lfrom:lfrom,
      lto:lto,
      content:data,
      success: function(res) {
          if(res.retcode == 0) {
              resolve({
                code:"ok",
                value:res.result
              })
          } else {
              reject({
                code:'no',
                value:res
              })
          }
      },
      fail: function(res) {
          console.log("网络失败",res)
      }
  })
  })
}

function arrayIndex(arr,val){
  for(let i=0;i<arr.length;i++){
    if(arr[i].id === val){
      return i;
    }
  }
  return -1;
}

function remove(arr,val){
  let index = arrayIndex(arr,val);
  if(index>-1){
    arr.splice(index,1);
  }
  return arr;
}

module.exports = {
  formatTime,
  showModal,
  judgeWhetherLogin,
  translate,
  arrayIndex,
  remove
}
