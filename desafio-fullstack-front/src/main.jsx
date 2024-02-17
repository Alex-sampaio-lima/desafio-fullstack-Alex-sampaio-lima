import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ClientProvider } from './providers/client.provider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContactProvider } from './providers/contact.provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </ClientProvider>
    </BrowserRouter >
  </React.StrictMode>
)
