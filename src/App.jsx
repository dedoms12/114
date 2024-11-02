import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './page/Auth/signin.jsx'
import SignUp from './page/Auth/signup.jsx'
import SignUpRole from './page/Auth/sign-up-role.jsx'
import Home from './page/Client/home.jsx'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-role" element={<SignUpRole />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
