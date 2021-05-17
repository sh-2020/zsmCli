const App = getApp();
const headUrl = App.globalData.globalUrl;
import {showModal} from './util'
let header = {
  "Authorization":"111111111111111111"
}
class Request {
    constructor (parms) {
      this.withBaseURL = parms.withBaseURL
      this.baseURL = parms.baseURL
      this.header =parms.header
      this.token =parms.token
    }
    get (url, data) {
      return this.request('GET', url, data)
    }
    post (url, data) {
      return this.request('POST', url, data)
    }
    put (url, data) {
      return this.request('PUT', url, data)
    }
    request (method, url, data,...parms) {
      const vm =this
      vm.header['Authorization'] = vm.token
      return new Promise((resolve, reject) => {
        wx.request({
          header:vm.header,
          url: vm.withBaseURL ? vm.baseURL + url : url,
          data,
          method,
          success (res) {
            resolve(res)
          },
          fail () {
            reject({
              msg:'请求失败',
              url: vm.withBaseURL ? vm.baseURL + url : url,
              method,
              data
            })
          }
        })
      })
    }
  }
  const request =new Request({
    baseURL:headUrl,
    withBaseURL:true,
    header:header,
  })

  function wrequest(parms){
    const request =new Request({
      baseURL:headUrl,
      withBaseURL:true,
      header:header,
      token:App.globalData.token
    })
    return new Promise(async (resolve,reject)=>{
      try {
        let result = await request.request(parms.method,parms.url,parms.data)
        if(result.statusCode == 401){
          let showResult =  showModal({content:"此操作需要先登录，请先登录",showCancel:false});
          if(showResult.whether == 'ok'){
            wx.navigateTo({
              url: '../pages/login/login',
            })
          }
        }
        if(result.statusCode == 200){resolve(result)}else{reject(result)}
      } catch (error) {
        reject(error)
      }
    })
   
  }
  module.exports = {
    request:request,
    wrequest:wrequest
  }