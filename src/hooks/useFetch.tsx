import axios, { AxiosPromise, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

interface Data {
  url: string,
  type?: 'post' | 'get' | 'delete' | 'put',
  body?: object
}

export default ({url, type = 'get', body}: Data) => {
  const [res, setRes] = useState({})
    useEffect(() => {
      const request = async () => {
        await axios({
          method: type,
          url: url,
          data: body
        }).then(res => setRes(res)).catch(error => setRes(error))
      }
      request()
    }, [url])
    return res
}