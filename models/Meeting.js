const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  host: { type: String, required: true },
  participants: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Meeting', meetingSchema);