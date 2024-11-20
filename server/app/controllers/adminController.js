const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    // Lấy tất cả user ngoại trừ admin
    const users = await User.find({ role: { $ne: 'Admin' } }).select(
      '-password'
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser };
