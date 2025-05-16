import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MeetingRoom from './components/MeetingRoom';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting/:roomName" element={<MeetingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;