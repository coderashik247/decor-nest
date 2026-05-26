import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import AuthModalProvider from './contexts/AuthModalProvider/AuthModalProvider.jsx'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthModalProvider>
          <RouterProvider router={router} />
        </AuthModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
