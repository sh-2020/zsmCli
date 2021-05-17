const App = getApp();
let headerUrl = App.globalData.globalUrl;
let header = {
    "Authorization":"11111111111111111111111111111"
}
//上传文件
function uploadFile(parms){
    return new Promise((resolve,reject)=>{
        header['Authorization'] = App.globalData.token;
        wx.uploadFile({
            filePath: parms.filePath,
            name: parms.name,
            url:headerUrl+parms.url,
            formData:parms.formData,
            header: header,
            success: (result) => {
                resolve(result)
            },
            fail: (res) => {
                reject({
                    msg:'上传失败 '+res.errMsg,
                    url:headerUrl+parms.url,
                    filePath:parms.filePath
                })
            },
          })
    })
}
/**
 * 下载文件
 * @param {object} parms 
 */
function downloadFile(parms){
    return new Promise((resolve,reject)=>{
        header['Authorization'] = App.globalData.token;
        wx.downloadFile({
            filePath:parms.filePath,
            url: headerUrl+parms.url,
            header: header,
            success(result){
                resolve(result)
            },
            fail(res){
                reject({
                    msg:"下载失败"+res.errMsg,
                    url:headerUrl+parms.url,
                    filePath:parms.filePath
                })
            }
        })
    })
}
module.exports = {
    uploadFile,
    downloadFile
}
