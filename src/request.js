import theAxios from 'axios'
const axios = theAxios.create({
  baseURL: 'https://registration.sends.cc/api/admin',
  timeout: 20000
})
//请求拦截
axios.interceptors.request.use(function(config){
  if(localStorage.getItem('token')?.length > 0 && config.headers.token === undefined){
    config.headers.token = localStorage.getItem('token')
  }
  return config
})
//响应拦截
axios.interceptors.response.use(function(response){
  return response
}),async function (error){
  console.dir(error)
  if(error.response.status === 401){
    const res = await axios({
      url: '/admin/login',
      method: 'POST',
      data: {
        admin:"sends",
        password:"Sends.cc.2022.0924"
      }
    })
    localStorage.setItem('token', res.data.data)
  }
}
export default ({ url, method = 'GET', params = {}, data = {}, headers = {}}) =>{
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}