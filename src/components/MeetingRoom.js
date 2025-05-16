import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';
import axios from 'axios';

const socket = io('http://localhost:5000');

const MeetingRoom = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Prompt for user name
    const name = prompt('Enter your name:');
    if (!name) {
      navigate('/');
      return;
    }
    setUserName(name);

    // Fetch meeting details
    axios.get(`http://localhost:5000/api/meetings/${roomName}`)
      .then((res) => {
        setParticipants(res.data.participants);
        socket.emit('join-room', { roomName, participant: name });
      })
      .catch(() => {
        alert('Meeting not found');
        navigate('/');
      });

    // Load Jitsi Meet
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => {
      const domain = 'meet.jit.si';
      const options = {
        roomName,
        width: '100%',
        height: 500,
        parentNode: document.querySelector('#jitsi-container'),
        userInfo: { displayName: name },
        configOverwrite: { startWithAudioMuted: true },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false },
      };
      new window.JitsiMeetExternalAPI(domain, options);
      setLoading(false);
    };
    document.body.appendChild(script);

    // Socket.io listeners
    socket.on('user-joined', ({ participants }) => {
      setParticipants(participants);
    });

    return () => {
      socket.off('user-joined');
      document.body.removeChild(script);
    };
  }, [roomName, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="meeting-room"
    >
      <h2>Meeting: {roomName}</h2>
      <div id="jitsi-container" style={{ display: loading ? 'none' : 'block' }} />
      {loading && <p>Loading meeting...</p>}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="participants"
      >
        <h3>Participants:</h3>
        <ul>
          {participants.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {p}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default MeetingRoom;