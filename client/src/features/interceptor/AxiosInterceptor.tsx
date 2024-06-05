import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function AxiosInterceptor() {
  const nav = useNavigate()

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        switch (error.response?.status) {
          case 400:
            toast.error(error.response?.data.message)
            break
          case 500:
            nav('/server-error')
            break
          default:
            toast.error(error.message)
            break
        }
      }
    )
  }, [nav])

  return null
}

export default AxiosInterceptor
