import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Context from './contextProvider/LoginContext.jsx'
import { Gamecontext } from './contextProvider/Gamecontext.jsx'

createRoot(document.getElementById('root')).render(
  <Context>
    <Gamecontext>
      <StrictMode>
        <App />
      </StrictMode>
    </Gamecontext>
  </Context>,
)
