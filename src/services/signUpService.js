const { prisma } = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function signup(email, password, firstName, lastName) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName },
  });
}

module.exports = { signup };