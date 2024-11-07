import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Nav from './Nav.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Activationpage from './Activationpage.jsx'
import LandingPage from './LandingPage.jsx';
import EventPage from './EventPage.jsx'
import GamePage from './GamePage.jsx'
import GameInfo from './GameInfo.jsx'



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
          <Route path='/landingPage' element={<LandingPage/>}/>
          <Route path='/eventPage' element={<EventPage/>}/>
          <Route path='/gamePage' element={<GamePage/>}/>
          <Route path='/gameInfo' element={<GameInfo/>}/>
        </Routes>
        
      </BrowserRouter >
    </>
  )
}

export default App
