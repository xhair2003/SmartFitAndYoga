// src/controllers/AuthController.js
const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class AuthController {
  async signup(req, res) {
    const { name, password, email } = req.body; // Thay đổi từ username thành name

    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ name }, { email }], // Sử dụng name thay vì username
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      const newUser = await User.create({
        name, // Sử dụng name
        password: hashedPassword,
        email,
        verification_token: verificationToken,
        verification_token_expires_at: Date.now() + 24 * 60 * 60 * 1000,
      });

      // Gọi hàm để gửi email xác minh (cần định nghĩa hàm này)
      await sendVerificationEmail(newUser.email, verificationToken);

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  async signin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Đăng nhập thành công', token, user });
    } catch (error) {
      console.error('Error logging in: ', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  }

  async verifyEmail(req, res) {
    const { code } = req.body;

    try {
      const user = await User.findOne({
        where: {
          verification_token: code,
          verification_token_expires_at: {
            [Op.gt]: new Date(),
          },
        },
      });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      }

      user.is_verified = true;
      user.verification_token = null;
      user.verification_token_expires_at = null;
      await user.save();

      res.status(200).json({ success: true, message: 'Email verified successfully', user });
    } catch (error) {
      console.error('Error in verifyEmail: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}

module.exports = new AuthController();