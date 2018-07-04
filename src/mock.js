const Mock = require('mockjs')
const Random = Mock.Random
//使用mockjs模拟数据
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
            photo: '1',
            gender: 1,
            is_banned: 0
        }
        result.msg.token = '123'
    } else {
        result.msg.success = 0
    }
    return result
})

Mock.mock('/user/register', 'post', (req, res) => {
    info = JSON.parse(req.body)
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

Mock.mock(/\/message\/follow/, 'get', {
    satusCode: 200,
    msg: {
        success: 1,
        'is_follow|0-1': 1
    }
})

Mock.mock(/\/weibo\/user/, 'get', (req, res) => {
    let result = Mock.mock({
        statusCode: 200,
        msg: {
            user: {
                "name|1-5": "★",
                "photo":"@dataImage('200x100','头像')"
            },
            "weibos|1-20": [
                {
                    "id|+1": 1,
                    content: {
                        "create_time": '@date("yyyy年MM月dd日") @time("HH:mm")',
                        "context": '@string(7, 300)',
                        "read_count|2-4": 1,
                        "comment_count|2-4": 1,
                        "transmit_count|2-4": 1,
                        "thumb_count|2-4": 1,
                        "photos|0-9":[
                            {
                                "id|2-2000":1,
                                "source":"@dataImage('200x100','照片')"
                            }
                        ]
                    }
                }
            ]
        }
    })

    return result
})