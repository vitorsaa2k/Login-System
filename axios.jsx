import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'



export const AAA = axios