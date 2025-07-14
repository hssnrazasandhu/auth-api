const { prisma } = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function loginService(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
}

module.exports = { loginService };
