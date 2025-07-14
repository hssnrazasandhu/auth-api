const { loginService } = require('../services/loginService');
const jwt = require('jsonwebtoken');

async function loginHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await loginService(email, password);

        // Create JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = { loginHandler };
