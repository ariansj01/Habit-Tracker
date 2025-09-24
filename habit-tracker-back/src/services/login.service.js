const userRepository = require('../repositories/user.repository');
const { validateEmail, validatePassword } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email or password format' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, error: 'JWT_SECRET is not configured' });
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const payload = { userId: user._id.toString(), email: user.email };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Do not send passwordHash in response
        const { passwordHash, refreshTokens, ...safeUser } = user.toObject ? user.toObject() : user;

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: safeUser,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = { login };