import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import Nav from './Nav.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Activationpage from './Activationpage.jsx'
import LandingPage from './LandingPage.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Nav />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/activation/:activation_token' element={<Activationpage />} />
          <Route path='/landingPage' element={<LandingPage/>}/>

        </Routes>
        
      </BrowserRouter >
    </>
  )
}

export default App
