const User = require('../models/User');

//
const getAllUsers = async (req, res) => {
  try {
    // Lấy tất cả user bao gồm cả admin
    const users = await User.find().select('-password');

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//
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

//
const updateNameUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Kiểm tra dữ liệu hợp lệ
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Invalid name.' });
    }

    // Kiểm tra xem tên đã được sử dụng bởi user khác hay chưa
    const existingUser = await User.findOne({ name: name.trim(), _id: { $ne: id } });
    if (existingUser) {
      return res.status(409).json({ message: 'Name already exists.' }); // HTTP 409 Conflict
    }

    // Cập nhật tên người dùng
    const user = await User.findByIdAndUpdate(
      id,
      { name: name.trim() }, // Loại bỏ khoảng trắng thừa
      { new: true, runValidators: true } // Trả về document đã cập nhật
    ).select('-password'); // Loại bỏ trường password khỏi kết quả

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Name updated successfully.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//
const updateRoleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // Role mới được gửi từ client

    // Kiểm tra role hợp lệ (nếu cần)
    const validRoles = ['User', 'Admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Role updated successfully.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getAllUsers, deleteUser, updateRoleUser, updateNameUser };
