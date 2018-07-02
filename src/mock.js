const Mock = require('mockjs')
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
            gender: '1',
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