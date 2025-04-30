import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Container from './components/Container/Container.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container />
  </StrictMode>,
)
