const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// Create a new meeting
router.post('/create', async (req, res) => {
  const { roomName, host } = req.body;
  try {
    const meeting = new Meeting({ roomName, host, participants: [host] });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(400).json({ error: 'Meeting creation failed' });
  }
});

// Join a meeting
router.post('/join', async (req, res) => {
  const { roomName, participant } = req.body;
  try {
    const meeting = await Meeting.findOne({ roomName });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
    if (!meeting.participants.includes(participant)) {
      meeting.participants.push(participant);
      await meeting.save();
    }
    res.json(meeting);
  } catch (error) {
    res.status(400).json({ error: 'Failed to join meeting' });
  }
});

// Get meeting details
router.get('/:roomName', async (req, res) => {
  const { roomName } = req.params;
  try {
    const meeting = await Meeting.findOne({ roomName });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
    res.json(meeting);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch meeting' });
  }
});

module.exports = router;