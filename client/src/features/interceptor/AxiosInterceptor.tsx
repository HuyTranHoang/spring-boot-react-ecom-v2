import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import { useEffect } from 'react'

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
            if (error.response?.data.message) {
              const errors = error.response?.data.message.split('; ').filter((message: string) => message !== '')
              throw errors
            }
            toast.error(error.response?.data.message)
            break
          case 500:
            nav('/server-error', { state: { error: error.response?.data.message } })
            break
          default:
            if (error.code === 'ERR_NETWORK') {
              nav('/not-found')
            } else {
              toast.error(error.message)
            }
            break
        }

        return Promise.reject(error)
      }
    )
  }, [nav])

  return null
}

export default AxiosInterceptor
