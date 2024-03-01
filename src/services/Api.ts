import axios from 'axios';

const api: any = axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
      "Content-Type":"application/json;charset=utf-8"
    }
  })

  export default api;