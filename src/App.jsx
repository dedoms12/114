import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './page/Auth/signin.jsx'
import SignUp from './page/Auth/signup.jsx'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
