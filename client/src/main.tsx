import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
