const userRepository = require('../repositories/user.repository');
const  {validateEmail, validatePassword} = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const GenerateRefreshToken = async (token) => {
    const refreshToken = jwt.sign({ token }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return refreshToken;
}

const GenerateAccessToken = async (token) => {
    const accessToken = jwt.sign({ token }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return accessToken;
}

const login = async (email , password) => {
    if (!validateEmail(email) && !validatePassword(password)) {
        return { success: false, error: 'Invalid email and password' };
    }
    try {
        const GetById = await userRepository.findByEmail(email)
        const checkPass = bcrypt.compare(GetById , password)
        if (checkPass) {
            return { success: true, data: GetById, accessToken: GenerateAccessToken(GetById), refreshToken: GenerateRefreshToken(GetById) };
        }
    } catch (error) {
        console.log(error)
        return { success: false, error: error.message };
    }
}

module.exports = { login };