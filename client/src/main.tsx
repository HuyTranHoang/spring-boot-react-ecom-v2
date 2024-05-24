import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios, { AxiosError } from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 400:
        toast.error(error.response?.data.message)
        break
      default:
        toast.error(error.message)
        break
    }

    console.log('interceptor is caller')
    return Promise.reject(error)
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
