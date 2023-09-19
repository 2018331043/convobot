import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'normalize.css'
import apiService from './services/api.service.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
apiService.init()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
)
