import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './router/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Authprovider/Firebase_context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
     
  </StrictMode>,
)
