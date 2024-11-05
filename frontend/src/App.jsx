import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Login from './login'
import Signup from './Signup'
import HomePage from './Homepage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
