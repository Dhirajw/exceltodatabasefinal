import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import './App.css';
import CourseList from '../components/Courselist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CourseList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
