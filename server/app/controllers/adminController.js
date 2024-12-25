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
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    // Object để chứa các trường cần cập nhật
    const updateFields = {};

    // Kiểm tra và thêm trường name nếu có
    if (name) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid name.' });
      }

      // Kiểm tra xem tên đã được sử dụng bởi user khác hay chưa
      const existingUser = await User.findOne({ name: name.trim(), _id: { $ne: id } });
      if (existingUser) {
        return res.status(409).json({ message: 'Name already exists.' });
      }

      updateFields.name = name.trim(); // Loại bỏ khoảng trắng thừa
    }

    // Kiểm tra và thêm trường role nếu có
    if (role) {
      const validRoles = ['User', 'Admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
      }

      updateFields.role = role;
    }

    // Nếu không có trường nào cần cập nhật
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update.' });
    }

    // Cập nhật người dùng
    const user = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true } // Trả về document đã cập nhật và chạy validator
    ).select('-password'); // Loại bỏ trường password khỏi kết quả

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User details updated successfully.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Băm mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({
      message: 'User added successfully.',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//
//
module.exports = { getAllUsers, deleteUser, updateUser,  addUser };
