import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './page/Auth/signin.jsx';
import SignUp from './page/Auth/signup.jsx';
import SignUpRole from './page/Auth/sign-up-role.jsx';
import Home from './page/Client/home-page/home.jsx';
import GeneralHealth from './page/Client/product-page/general-health/gen-health';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sign-up-role" element={<SignUpRole />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/general-health" element={<GeneralHealth />} />
      </Routes>
    </Router>
  );
}

export default App;
