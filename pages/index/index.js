Page({
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
  // 更改称呼函数
  pick: function (e) {
    let that = this;
    // console.log("触发选择事件")
    that.setData({
      chosen_ind: e.detail.value,
    });
    that.setGlobalData({
      chosen_ind: e.detail.value,
    });
  },
  // 更改文本内容
  changeWrites: function (e) {
    let that = this;
    // console.log("触发文本更改事件", e)
    that.setData({
      text_content: e.detail.value,
    });
    that.setGlobalData({
      text_content: e.detail.value,
    });
  },
  // 选择背景图
  changeBack: function () {
    let that = this;
    // 显示选择列表，拍照还是从相册中选择
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00ff20",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },
  // 根据所选类型进行操作
  chooseWxImage: function (type) {
    let that = this;
    // 选择图片加入缓存
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: [type],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        // 设置该临时路径到data和传到云端
        console.log(res.tempFiles[0].tempFilePath);
        that.setData({
          file_path: res.tempFiles[0].tempFilePath
        })
        that.setGlobalData({
          file_path: res.tempFiles[0].tempFilePath
        });
        // 上传该文件
        wx.cloud.uploadFile({
          cloudPath: 'example.png', // 上传至云端的路径
          filePath: res.tempFiles[0].tempFilePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
          },
          fail: console.error
        })
      }
    })


  },
  // 更改皮肤配色
  chooseColor: function (e) {
    let that = this;
    // console.log(e.target.id);
    let color = e.target.id;
    // 设置数据和云端数据
    that.setData({
      color_ind: color,
    });
    that.setGlobalData({
      color_ind: color,
    });
  },
  // 分享逻辑
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '送你一张宣宣贺卡'
        })
      }, 100)
    })
    return {
      title: '送你一张宣宣贺卡',
      path: 'pages/share/share',
    }
  },
})