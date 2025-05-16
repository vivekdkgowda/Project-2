import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [host, setHost] = useState('');
  const [participant, setParticipant] = useState('');
  const navigate = useNavigate();

  const createMeeting = async () => {
    if (!roomName || !host) return alert('Please fill all fields');
    try {
      await axios.post('http://localhost:5000/api/meetings/create', { roomName, host });
      navigate(`/meeting/${roomName}`);
    } catch (error) {
      alert('Failed to create meeting');
    }
  };

  const joinMeeting = async () => {
    if (!roomName || !participant) return alert('Please fill all fields');
    try {
      await axios.post('http://localhost:5000/api/meetings/join', { roomName, participant });
      navigate(`/meeting/${roomName}`);
    } catch (error) {
      alert('Failed to join meeting');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home"
    >
      <h2>Create or Join a Meeting</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Name (Host)"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createMeeting}
        >
          Create Meeting
        </motion.button>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Name (Participant)"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={joinMeeting}
        >
          Join Meeting
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home;