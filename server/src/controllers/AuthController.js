// src/controllers/AuthController.js
const {
  generateRefreshTokenAndSetCookie,
  generateToken,
} = require('../utils/generateToken');
const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class AuthController {
  async signup(req, res) {
    try {
      const { password, email } = req.body;

      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: 'Email already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const newUser = await User.create({
        password: hashedPassword,
        email,
        verification_token: verificationToken,
        verification_token_expires_at: Date.now() + 24 * 60 * 60 * 1000,
      });

      generateRefreshTokenAndSetCookie(res, newUser.id);

      await sendVerificationEmail(newUser.email, verificationToken);

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({
        error: 'Error registering user',
      });
    }
  }

  // async verifyEmail(req, res) {
  //   const { code } = req.body;

  //   try {
  //     const user = await User.findOne({
  //       where: {
  //         verification_token: code,
  //         verification_token_expires_at: {
  //           [Op.gt]: new Date(),
  //         },
  //       },
  //     });

  //     if (!user) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Invalid or expired verification code',
  //       });
  //     }

  //     user.is_verified = true;
  //     user.verification_token = null;
  //     user.verification_token_expires_at = null;
  //     await user.save();

  //     await sendWelcomeEmail(user.email);

  //     res.status(200).json({
  //       success: true,
  //       message: 'Email verified successfully',
  //       user: {
  //         id: user.id,
  //         email: user.email,
  //         is_verified: user.is_verified,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error in verifyEmail: ', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'Server error',
  //     });
  //   }
  // }

  async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = generateToken(user.id);
      const refreshToken = generateRefreshTokenAndSetCookie(res, user.id);

      user.lastLogin = new Date();
      await user.save();
      res.json({
        message: 'Logged in successfully',
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          is_verified: user.is_verified,
        },
      });
    } catch (error) {
      console.error('Error logging in: ', error);
      res.status(500).json({
        error: 'Error logging in',
      });
    }
  }

  // async logout(req, res) {
  //   res.clearCookie('refreshToken');
  //   res.status(200).json({
  //     success: true,
  //     message: 'Logged out successfully',
  //   });
  // }

  // async forgotPassword(req, res) {
  //   const { email } = req.body;
  //   try {
  //     const user = await User.findOne({
  //       where: { email },
  //     });
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }

  //     const resetToken = crypto.randomBytes(20).toString('hex');
  //     const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

  //     user.resetPasswordToken = resetToken;
  //     user.resetPasswordExpiresAt = resetTokenExpiresAt;

  //     await user.save();

  //     await sendPasswordResetEmail(
  //       user.email,
  //       `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
  //     );

  //     res.json({
  //       success: true,
  //       message: 'Password reset link sent to your email',
  //     });
  //   } catch (error) {
  //     console.error('Error in forgotPassword: ', error);
  //     res.status(500).json({
  //       error: 'Error in forgotPassword',
  //     });
  //   }
  // }

  // async resetPassword(req, res) {
  //   const { token } = req.params;
  //   const { password } = req.body;

  //   try {
  //     const user = await User.findOne({
  //       where: {
  //         reset_password_token: token,
  //         reset_password_expires_at: {
  //           [Op.gt]: new Date(),
  //         },
  //       },
  //     });

  //     if (!user) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Invalid or expired reset token',
  //       });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     user.password = hashedPassword;
  //     user.reset_password_token = null;
  //     user.reset_password_expires_at = null;
  //     await user.save();

  //     await sendResetSuccessEmail(user.email);

  //     res.status(200).json({
  //       success: true,
  //       message: 'Password reset successful',
  //     });
  //   } catch (error) {
  //     console.error('Error resetting password: ', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error resetting password',
  //     });
  //   }
  // }

  async refreshToken(req, res) {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;

    console.log('Refresh Token from cookie:', refreshToken); // Thêm câu lệnh này để debug

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const newToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token: newToken });
    } catch (error) {
      console.error('Error refreshing token: ', error);
      res.status(403).json({
        error: 'Invalid refresh token',
      });
    }
  }
}

module.exports = new AuthController();