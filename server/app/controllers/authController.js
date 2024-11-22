const User = require('../models/User');
const { generateToken } = require('../services/jwtService');
// const { OAuth2Client } = require('google-auth-library');

// const client_id = process.env.GG_CLIENT_ID;
// const client = new OAuth2Client(client_id);

// const verifyGoogleToken = async (token) => {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: client_id,
//   });
//   const payload = ticket.getPayload();
//   return payload;
// };

// const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const payload = await verifyGoogleToken(token);

//     const { name, email, sub } = payload;
//     let account = await User.findOne({ email, googleId: sub });
//     if (!account) {
//       account = await User.create({
//         fullName: name,
//         username: email,
//         email,
//         is_active: true,
//         googleId: sub,
//       });
//     }
//     return res.status(200).json({account});
//   } catch (error) {
//     return res.status(500).json({error: error.message});
//   }
// }

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.json({
      token,
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

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Change Password Error:', error.message);
    res.status(500).json({ error: error.message });
  }

};

module.exports = { 
  register,
  login,
  changePassword,
  // googleLogin 
};
