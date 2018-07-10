const Mock = require('mockjs')
const Random = Mock.Random
//使用mockjs模拟数据
function parseUrl(url) {
  var queryObj = {};
  var reg = /[?&]([^=&#]+)=([^&#]*)/g;
  var querys = url.match(reg);
  if (querys) {
    for (var i in querys) {
      var query = querys[i].split('=');
      var key = query[0].substr(1),
        value = query[1];
      queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
    }
  }
  return queryObj;
}



Mock.mock('/user/login', 'post', (req, res) => {
  info = JSON.parse(req.body)
  let result = {}
  result.satusCode = 200
  result.msg = {}
  if (info.name == 'a' && info.password == '123') {
    result.msg.success = 1
    result.msg.user = {
      id: 123,
      name: 'a',
      email: '123@123.com',
      photo: 'https://img.xiaopiu.com/userImages/img201644e5199c0.jpg',
      gender: 1,
      is_banned: 0,
      is_admini:1
    }
    result.msg.token = '1234'
  } else {
    result.msg.success = 0
  }
  return result
})

Mock.mock('/user/register', 'post', (req, res) => {
  let result = {}
  result.satusCode = 200
  result.msg = {}
  result.msg.success = 1
  return result
})

Mock.mock('/message/follow', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})


Mock.mock(/\/weibo\/user/, 'get', (req, res) => {
  let query = parseUrl(req.url)

  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "weibos|1-20": [{
        "id|+1": 1,
        content: {
          "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
          "context": '@string(7, 300)',
          "read_count|2-4": 1,
          "comment_count|2-4": 1,
          "transmit_count|2-4": 1,
          "thumb_count|2-4": 1,
          "photos|0-9": [{
            "id|+1": 1,
            "source": "@dataImage('200x100','照片')"
          }]
        }
      }]
    }
  })

  if (query.token) {
    result.msg.weibos.forEach(weibo => {
      weibo.content.is_thumb = Random.integer(0, 1)
      return weibo
    });
  }
  return result
})


Mock.mock(/\/message\/user/, 'get', {
  statusCode: 200,
  msg: {
    success: 1,
    user: {
      "name|1-5": "★",
      "photo": "@dataImage('200x100','头像')"
    },
    counter: {
      "count_follow|0-999": 1,
      "count_fans|0-999": 1,
      "count_weibo|0-999": 1
    },
    "follow|0-5": [{
      "id|+1": 1,
      "name|1-5": "★",
      "photo": "@dataImage('100x100','头像')"
    }],
    "interests|0-5": [{
      "id|+1": 1,
      "name|1-5": "★",
      "photo": "@dataImage('100x100','头像')"
    }],
  }
})

Mock.mock('/message/modify_pass', 'post', (req, res) => {
  let result = {
    satusCode: 200,
    msg: {
      success: 0,
    }
  }
  info = JSON.parse(req.body)
  if (info.old_password == '123') {
    result.msg.success = 1
  }
  return result
})


Mock.mock('/weibo/thumb', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})


Mock.mock('/weibo/interests', 'get', {
  satusCode: 200,
  msg: {
    success: 1,
    'interests|0-10': [{
      "id|+1": 1,
      "name": '@string(3, 10)',
    }]
  }
})

Mock.mock('/weibo/issue', 'post', (req, res) => {
  console.log(JSON.parse(req.body))
  return Mock.mock({
    satusCode: 200,
    msg: {
      success: 1,
    }
  })
})

Mock.mock('/weibo/comment', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/weibo/delete', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/weibo/del_comment', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock(/\/weibo\/detail/, 'get', (req, res) => {
  let query = parseUrl(req.url)
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      weibo: {
        "id|+1": 1,
        content: {
          "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
          "context": '@string(7, 300)',
          "read_count|2-4": 1,
          "comment_count|2-4": 1,
          "transmit_count|2-4": 1,
          "thumb_count|2-4": 1,
          "photos|0-9": [{
            "id|+1": 1,
            "source": "@dataImage('200x100','照片')"
          }]
        },
        user: {
          "id|+1": 1,
          "photo": "@dataImage('100x100','头像')",
          "name": '@string(3, 10)',
        }
      },
      'comments|0-5': [{
        "id|+1": 1,
        user: {
          "id|+1": 123,
          name: '@string(7, 10)',
          photo: "@dataImage('100x100','头像')"
        },
        create_time: '@date("yyyy年MM月dd日") @time("HH:mm")',
        context: "@string(7, 300)"
      }]
    }
  })

  if (query.token) {
    result.msg.weibo.content.is_thumb = 1
  }

  result.msg.comments.forEach(item => {
    if (Random.boolean()) {
      item.parent = {
        id: 1,
        name: "test"
      }
    }
    return item
  })
  return result
})

Mock.mock('/weibo/look_hot', 'get', (req, res) => {

  return Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "weibos|1-20": [{
        "id|+1": 1,
        content: {
          "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
          "context": '@string(7, 300)',
          "read_count|2-4": 1,
          "comment_count|2-4": 1,
          "transmit_count|2-4": 1,
          "thumb_count|2-4": 1,
          "photos|0-9": [{
            "id|+1": 1,
            "source": "@dataImage('200x100','照片')"
          }]
        },
        user: {
          "id|+1": 1,
          "photo": "@dataImage('100x100','头像')",
          "name": '@string(3, 10)',
        }
      }]
    }
  })

})

Mock.mock('/interest/hot', 'get', {
  statusCode: 200,
  msg: {
    success: 1,
    "interests|15-20": [{
      "id|+1": 1,
      "count|2-4000": 1,
      name: '@string(7, 20)',
      imageUrl: "@dataImage('400x100','趣点')",

    }]
  }
})


Mock.mock(/\/interest\/look_list/, 'get', {
  statusCode: 200,
  msg: {
    success: 1,
    "interests|15-20": [{
      "id|+1": 1,
      "count|2-4000": 1,
      name: '@string(7, 20)',
      imageUrl: "@dataImage('400x100','趣点')",

    }]
  }
})


Mock.mock(/\/weibo\/look_interest/, 'get', (req, res) => {
  let query = parseUrl(req.url)
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      interest: {
        "id|+1": 1,
        "count|2-4000": 1,
        name: '@string(7, 20)',
      },
      "weibos|0-20": [{
        "id|+1": 1,
        content: {
          "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
          "context": '@string(7, 300)',
          "read_count|2-4": 1,
          "comment_count|2-4": 1,
          "transmit_count|2-4": 1,
          "thumb_count|2-4": 1,
          "photos|0-9": [{
            "id|+1": 1,
            "source": "@dataImage('200x100','照片')"
          }],
        },
        user: {
          "id|+1": 1,
          "photo": "@dataImage('100x100','头像')",
          "name": '@string(3, 10)',
        }
      }],
    }
  })

  if (query.token) {
    result.msg.is_subs = 1
    result.msg.weibos.forEach(weibo => {
      weibo.content.is_thumb = 0
      if (Random.boolean()) {
        weibo.content.is_thumb =1
      }
      return weibo
    })
  }

  return result
})

Mock.mock('/interest/add', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock(/\/message\/followeds/, 'get', {
  satusCode: 200,
  msg: {
    success: 1,
    'users|0-20': [{
      'id|+1': 12,
      "photo": "@dataImage('100x100','头像')",
      "name": '@string(3, 10)',
      "gender|0-2": 1
    }]
  }
})

Mock.mock(/\/message\/follow/, 'get', {
  satusCode: 200,
  msg: {
    success: 1,
    'is_follow|0-1': 1
  }
})

Mock.mock('/message/modify', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock(/\/system\/user\/search/, 'get', (req, res) => {
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "users|10": [{
        "id|+1": 1,
        name: '@string(3, 10)',
        email: "123@123.com",
        "comment_count|10-200": 1,
        "weibo_count|10-200": 1,
        "fans_count|10-200": 1,
        "thumb_count|10-200": 1,
        "is_banned": "@integer(0, 1)"
      }]
    }
  })

  result.msg.user_count = 100
  return result
})




Mock.mock(/\/system\/weibo\/search/, 'get', (req, res) => {
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "weibos|10": [{
        "id|+1": 1,
        userName: '@string(3, 10)',
        "read_count|10-200": 1,
        "comment_count|10-200": 1,
        "transmit_count|10-200": 1,
        "thumb_count|10-200": 1,
        "context": "@string(3, 300)"
      }]
    }
  })

  result.msg.weibo_count = 100
  return result
})

Mock.mock(/\/system\/comment\/search/, 'get', (req, res) => {
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "comments|10": [{
        "id|+1": 1,
        user: {
          "id|+1": 1,
          "name": '@string(3, 10)',
          "photo": "@dataImage('100x100','头像')",
        },
        create_time: '@date("yyyy年MM月dd日") @time("HH:mm")',
        context:
          "@string(7, 300)sadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddxdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
      }]
    }
  })

  result.msg.comment_count = 100
  return result
})


Mock.mock(/\/system\/interest\/search/, 'get', (req, res) => {
  let result = Mock.mock({
    statusCode: 200,
    msg: {
      success: 1,
      "interests|10": [{
        "id|+1": 1,
        name: '@string(3, 10)',
        "weibo_count|2-500": 1,
        "sub_count|2-500": 1
      }]
    }
  })

  result.msg.interest_count = 100
  return result
})



Mock.mock('/system/interest/delete', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/system/weibo/delete', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/system/comment/delete', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/system/user/banned', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock('/system/interest/add', 'post', {
  satusCode: 200,
  msg: {
    success: 1,
  }
})

Mock.mock(/\/weibo\/search/, 'get', (req, res) => {
  let query = parseUrl(req.url)
  if (query.sort == 0) {
    return Mock.mock({
      statusCode: 200,
      msg: {
        success: 1,
        "weibos|1-20": [{
          "id|+1": 1,
          content: {
            "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
            "context": '@string(7, 300)',
            "read_count|2-4": 1,
            "comment_count|2-4": 1,
            "transmit_count|2-4": 1,
            "thumb_count|2-4": 1,
            "photos|0-9": [{
              "id|+1": 1,
              "source": "@dataImage('200x100','照片')"
            }]
          },
          user: {
            "id|+1": 1,
            "photo": "@dataImage('100x100','头像')",
            "name": '@string(3, 10)',
          }
        }]
      }
    })

  } else {
    return Mock.mock({
      statusCode: 200,
      msg: {
        success: 1,
        "users|1-20": [{
          "id|+1": 1,
          "name": '@string(3, 10)',
          "photo": "@dataImage('100x100','头像')",
          "gender|0-2": 1

        }]
      }
    })
  }
})
