import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Main from './pages/Main';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
