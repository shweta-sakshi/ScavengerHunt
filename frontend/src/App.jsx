import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Login from './login'
import Signup from './Signup'
import Activationpage from './Activationpage'
import HomePage from './HomePage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nav />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/activation/:activation_token' element={<Activationpage />} />
          <Route path='/homePage' element={<HomePage />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
