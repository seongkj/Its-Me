import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit/Edit';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Mypage from './pages/Mypage/Mypage';
import Main from './pages/Main/Main';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Themes from './pages/Themes/Themes';
import Portfolio from './pages/Portfolio/Portfolio';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
