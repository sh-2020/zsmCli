export default class Navigator {
    static page = {}
    static putPage(path,value){
        this.page[path] = value;
    }
    static delPage(path){
        delete this.page[path];
    }
    static getPage(path){
        return this.page[path]
    }
}