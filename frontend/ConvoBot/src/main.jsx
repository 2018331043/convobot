import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'normalize.css'
import apiService from './services/api.service.js'

apiService.init()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
