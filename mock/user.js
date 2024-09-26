
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/user/list',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          'records': [
            {
              'id': '1831321274362028033',
              'username': 'test02',
              'realname': 'tanzhen',
              'avatar': null,
              'birthday': null,
              'sex': null,
              'email': 'test@163.com',
              'phone': '17701389736',
              'orgCode': null,
              'orgCodeTxt': null,
              'status': 1,
              'delFlag': 0,
              'workNo': '0001',
              'post': null,
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2024-09-04 21:19:51',
              'updateBy': null,
              'updateTime': null,
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': null,
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常'
            },
            {
              'id': '1818190298387714049',
              'username': 'test01',
              'realname': 'fushi',
              'avatar': null,
              'birthday': null,
              'sex': null,
              'email': 'ge_yu_long@163.com',
              'phone': '17701389735',
              'orgCode': 'A01A05',
              'orgCodeTxt': '研发部',
              'status': 1,
              'delFlag': 0,
              'workNo': 'test01',
              'post': null,
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2024-07-30 15:42:02',
              'updateBy': 'test01',
              'updateTime': '2024-07-30 15:45:24',
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': null,
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常'
            },
            {
              'id': '1656275972426022913',
              'username': 'test',
              'realname': '测试用户',
              'avatar': null,
              'birthday': null,
              'sex': null,
              'email': 'ping@163.com',
              'phone': '13546737584',
              'orgCode': 'A02',
              'orgCodeTxt': '测试部门1',
              'status': 1,
              'delFlag': 0,
              'workNo': '130000',
              'post': null,
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2023-05-10 20:32:19',
              'updateBy': 'test',
              'updateTime': '2023-05-29 17:25:24',
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': null,
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常'
            },
            {
              'id': 'f0019fdebedb443c98dcb17d88222c38',
              'username': 'zhagnxiao',
              'realname': '张小红12',
              'avatar': 'https://static.jeecg.com/temp/jmlogo_1606575041993.png',
              'birthday': '2019-04-01',
              'sex': null,
              'email': null,
              'phone': '18611711111',
              'orgCode': '',
              'orgCodeTxt': null,
              'status': 2,
              'delFlag': 0,
              'workNo': '00003',
              'post': '',
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2020-10-01 19:34:10',
              'updateBy': 'admin',
              'updateTime': '2022-09-22 10:40:24',
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': '',
              'clientId': null,
              'homePath': null,
              'status_dictText': '冻结'
            },
            {
              'id': '3d464b4ea0d2491aab8a7bde74c57e95',
              'username': 'zhangsan',
              'realname': '张三',
              'avatar': 'https://static.jeecg.com/temp/jmlogo_1606575041993.png',
              'birthday': null,
              'sex': null,
              'email': null,
              'phone': '13716795593',
              'orgCode': '',
              'orgCodeTxt': null,
              'status': 1,
              'delFlag': 0,
              'workNo': '0005',
              'post': '总经理',
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2020-05-14 21:26:24',
              'updateBy': 'admin',
              'updateTime': '2023-04-22 19:49:29',
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': '',
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常',
              'post_dictText': 'laozong'
            },
            {
              'id': 'e9ca23d68d884d4ebb19d07889727dae',
              'username': 'admin',
              'realname': '管理员',
              'avatar': 'https://static.jeecg.com/temp/国炬软件logo_1606575029126.png',
              'birthday': '2018-12-05',
              'sex': 1,
              'email': 'jeecg@163.com',
              'phone': '18611111111',
              'orgCode': 'A01',
              'orgCodeTxt': null,
              'status': 1,
              'delFlag': 0,
              'workNo': '00001',
              'post': '总经理',
              'telephone': null,
              'createBy': null,
              'createTime': '2019-06-21 17:54:10',
              'updateBy': 'test',
              'updateTime': '2024-07-30 09:16:24',
              'activitiSync': 1,
              'userIdentity': 2,
              'departIds': '',
              'relTenantIds': '',
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常',
              'post_dictText': 'laozong',
              'sex_dictText': '男'
            },
            {
              'id': 'a75d45a015c44384a04449ee80dc3503',
              'username': 'jeecg',
              'realname': 'jeecg',
              'avatar': 'https://static.jeecg.com/temp/国炬软件logo_1606575029126.png',
              'birthday': null,
              'sex': 1,
              'email': null,
              'phone': null,
              'orgCode': '',
              'orgCodeTxt': null,
              'status': 1,
              'delFlag': 0,
              'workNo': '00002',
              'post': 'devleader',
              'telephone': null,
              'createBy': 'admin',
              'createTime': '2019-02-13 16:02:36',
              'updateBy': 'jeecg',
              'updateTime': '2022-03-09 23:03:21',
              'activitiSync': 1,
              'userIdentity': 1,
              'departIds': '',
              'relTenantIds': null,
              'clientId': null,
              'homePath': null,
              'status_dictText': '正常',
              'post_dictText': '研发部经理',
              'sex_dictText': '男'
            }
          ],
          'total': 7,
          'size': 10,
          'current': 1,
          'orders': [],
          'optimizeCountSql': true,
          'searchCount': true,
          'countId': null,
          'maxLimit': null,
          'pages': 1
        }
      }
    }
  }
]
