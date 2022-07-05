// import { Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from './components/Edit/Edit';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
