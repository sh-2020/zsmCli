
class FileOperate {
    constructor(){
        this.fs = wx.getFileSystemManager()
    }
    /**
     * 判断文件是否存在
     * @param {Object} parms 
     */
    access(parms){
        return new Promise((resolve,reject)=>{
            this.fs.access({
                path:parms.path,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:"为找到文件 "+res.errMsg,
                        path:parms.parms,
                        method:"access"
                    })
                }
            })
        })
    }
    /**
     * 向文件中追加内容 
     * @param {Object} parms 
     */
    appendFile(parms){
        return new Promise((resolve,reject)=>{
            this.fs.appendFile({
                filePath:parms.filePath, //本地文件路径
                data:parms.data, //string/ArrayBuffer
                encoding:parms.encoding,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:"追加错误 "+res.errMsg,
                        filePath:parms.filePath,
                        method:appendFile
                    })
                }
            })
        })
    }
    /**
     * 打开文件
     * @param {*} parms 
     */
    openFile(parms){
        return new Promise((resolve,reject)=>{
            this.fs.open({
                filePath:parms.filePath,
                flag:parms.flag,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:"打开文件失败 "+res.errMsg,
                        filePath:parms.filePath,
                        method:'openFile'
                    })
                }
            })
        })
    }
    /**
     * 关闭文件
     * @param {描述符} parms 
     */
    closeFile(fd){
        return new Promise((resolve,reject)=>{
            this.fs.close({
                fd:fd,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:"关闭文件错误 "+res.errMsg,
                        method:'closeFile'
                    })
                }
            })
        })
    }
    /**
     * 读取文件
     * @param {*} parms 
     */
    readFile(parms){
        return new Promise((resolve,reject)=>{
            this.fs.readFile({
                filePath:parms.filePath,
                encoding:parms.encoding,
                position:parms.position,
                length:parms.length,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:'读取文件错误 '+res.errMsg,
                        filePath:parms.filePath,
                        method:'readFile'
                    })
                }
            })
        })
    }
    /**
     * 复制文件
     * @param {*} parms 
     */
    copyFile(parms){
        return new Promise((resolve,reject)=>{
            this.fs.copyFile({
                srcPath:parms.srcPath,
                destPath:parms.destPath,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:'复制文件失败 '+res.errMsg,
                        filePath:parms.filePath,
                        method:'copyFile'
                    })
                }
            })
        })
    }
    /**
     * 写入文件
     * @param {*} parms 
     */
    write(parms){
        return new Promise((resolve,reject)=>{
            this.fs.write({
                fd:parms.fd,
                data:parms.data,
                offset:parms.offset,
                length:parms.length,
                encoding:parms.encoding,
                position:parms.position,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:'写入文件失败 '+res.errMsg,
                        filePath:parms.filePath,
                        method:'copyFile'
                    })
                }
            })
        })
    }
    /**
     * 写文件
     * @param {*} parms 
     */
    writeFile(parms){
        return new Promise((resolve,reject)=>{
            this.fs.copyFile({
                filePath:parms.filePath,
                data:parms.data,
                encoding:parms.encoding,
                success(res){
                    resolve(res)
                },
                fail(res){
                    reject({
                        msg:'写文件失败 '+res.errMsg,
                        filePath:parms.filePath,
                        method:'copyFile'
                    })
                }
            })
        })
    }
    getImageSuffix(str){
        let reg = /.[a-zA-Z]+$/i
        let regRes = str.match(reg)
        return regRes
    }
}
const fileOperate = new FileOperate()

module.exports = fileOperate
