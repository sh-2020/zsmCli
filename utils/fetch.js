const App = getApp();
let header = {
    "Authorization":"11111111111111111111111111111"
}

function fetch(data){
    header['Authorization'] = App.globalData.token;
    data.header = header
    wx.request(data)
}


module.exports = fetch