import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Login from './login'
import Signup from './Signup'
import Activationpage from './Activationpage'
import Sockettest from './Sockettest'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nav />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/game' element={<Sockettest />} />
          <Route path='/activation/:activation_token' element={<Activationpage />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
