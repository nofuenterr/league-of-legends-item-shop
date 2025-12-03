import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/reset.css'
import './styles/modern-normalize.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
