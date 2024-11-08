// src/controllers/AuthController.js
const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class AuthController {
  async signup(req, res) {
    const { email, password } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã tồn tại.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ message: 'Đăng ký thành công!', user });
    } catch (error) {
      console.error('Error in signup:', error);
      return res.status(500).json({ error: 'Lỗi khi đăng ký người dùng' });
    }
  }

  async signin(req, res) {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email không tồn tại.' });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mật khẩu không chính xác.' });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Đăng nhập thành công!', token, user });
  }
}

module.exports = new AuthController();