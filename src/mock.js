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
        result.msg.success = 2
        result.msg.user = {
            id: 123,
            name: 'a',
            email: '123@123.com',
            photo: 'https://img.xiaopiu.com/userImages/img201644e5199c0.jpg',
            gender: 1,
            is_banned: 0
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
            success: 1,
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
                        "photos|0-9": [
                            {
                                "id|+1": 1,
                                "source": "@dataImage('200x100','照片')"
                            }
                        ]
                    }
                }
            ]
        }
    })

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
        "follow|0-5": [
            {
                "id|+1": 1,
                "name|1-5": "★",
                "photo": "@dataImage('100x100','头像')"
            }
        ],
        "interests|0-5": [
            {
                "id|+1": 1,
                "name|1-5": "★",
                "photo": "@dataImage('100x100','头像')"
            }
        ],
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

Mock.mock(/\/weibo\/search/, 'get', (req, res) => {
    let query = parseUrl(req.url)
    if (query.sort == 0) {
        return Mock.mock({
            statusCode: 200,
            msg: {
                success: 1,
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
                            "photos|0-9": [
                                {
                                    "id|+1": 1,
                                    "source": "@dataImage('200x100','照片')"
                                }
                            ]
                        },
                        user: {
                            "photo": "@dataImage('100x100','头像')",
                            "name": '@string(3, 10)',
                        }
                    }
                ]
            }
        })

    } else {
        return Mock.mock({
            statusCode: 200,
            msg: {
                success: 1,
                "users|1-20": [
                    {
                        "id|+1": 1,
                        "name": '@string(3, 10)',
                        "photo": "@dataImage('100x100','头像')",
                        "gender|0-2":1
                        
                    }
                ]
            }
        })
    }



})

