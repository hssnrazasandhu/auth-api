const { signup } = require('../services/signUpService');

async function signupHandler(req, res) {
    const { email, password, firstName, lastName } = req.body;
    try {
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields (email, password, firstName, lastName) are required' });
        }
        const user = await signup(email, password, firstName, lastName);
        res.status(201).json({ message: 'Signup successful', userId: user.id });
    } catch (error) {
        res.status(400).json({ message: 'Signup failed', error: error.message });
    }
}

module.exports = { signupHandler };