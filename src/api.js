import axios from './request.js'

//登录
export const login = () => axios({
  url: '/login',
  method: 'POST',
  data: {
    admin:"sends",
    password:"Sends.cc.2022.0924"
  }
})
//获取面试列表
export const line = (department) => axios({
  url: `/line/${department}`,
  method: 'GET',
})
