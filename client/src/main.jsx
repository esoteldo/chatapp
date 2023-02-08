import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import ClientApp from './ClientApp' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClientApp />
  </React.StrictMode>,
)
