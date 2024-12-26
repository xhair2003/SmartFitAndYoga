const User = require('../models/User');
const NodeCache = require('node-cache');

// Tạo instance của NodeCache
const cache = new NodeCache({ stdTTL: 300 }); // TTL 5 phút, kiểm tra mỗi 2 phút

// Lấy tất cả user (sử dụng bộ nhớ đệm)
const getAllUsers = async (req, res) => {
  try {
    // Kiểm tra dữ liệu trong cache
    const cachedUsers = cache.get('allUsers');
    if (cachedUsers) {
      return res.json(cachedUsers);
    }

    // Nếu không có trong cache, lấy dữ liệu từ cơ sở dữ liệu
    const users = await User.find().select('-password');

    // Lưu vào cache
    cache.set('allUsers', users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa user (xóa cache liên quan)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Xóa cache
    cache.del('allUsers');

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin user (xóa cache liên quan)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const updateFields = {};
    if (name) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid name.' });
      }
      const existingUser = await User.findOne({ name: name.trim(), _id: { $ne: id } });
      if (existingUser) {
        return res.status(409).json({ message: 'Name already exists.' });
      }
      updateFields.name = name.trim();
    }

    if (role) {
      const validRoles = ['User', 'Admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
      }
      updateFields.role = role;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update.' });
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Xóa cache
    cache.del('allUsers');

    res.json({ message: 'User details updated successfully.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm user mới (xóa cache liên quan)
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const validRoles = ['User', 'Admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    const user = new User({ name: name.trim(), email, password, role: role || 'User' });
    await user.save();

    // Xóa cache
    cache.del('allUsers');

    res.status(201).json({
      message: 'User added successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, updateUser, addUser };
