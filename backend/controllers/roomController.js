const Room = require('../models/room.model');

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, building, capacity, equipment } = req.body;

    const newRoom = new Room({ roomNumber, building, capacity, equipment });
    await newRoom.save();

    res.status(201).json({ message: 'Room added successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error adding room', error });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};
