Page({
  data:{
    author: false,
  },
  onLoad: function () {
    // 获取云数据库
    const db = wx.cloud.database();
    let that = this;
    const todo = db.collection('card_info').doc('e99a6bef63f9f638000011366999e245');
    todo.get({
      success: function (res) {
        that.setData(res.data);
      }
    })
    // 获取云图像作为背景图
    wx.cloud.downloadFile({
      fileID: 'cloud://cloud1-7g5i6rx2a5d12d0c.636c-cloud1-7g5i6rx2a5d12d0c-1316995105/example.png', // 文件 ID
      success: res => {
        // 返回临时文件路径并设置到本地
        // console.log(res.tempFilePath)
        this.setData({
          file_path: res.tempFilePath
        })
      },
      fail: console.error
    })
  },
  setGlobalData: function (changed) {
    // 获取云数据库
    const db = wx.cloud.database();
    let that = this;
    const todo = db.collection('card_info').doc('e99a6bef63f9f638000011366999e245');
    todo.update({
      data: changed
    });
  },

  getUserProfile(e) {
    console.log("?")
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          author: true,
        })
      }
    })
  },

  author(e){
    this.getUserProfile();
  }
})