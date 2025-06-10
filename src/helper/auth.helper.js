const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash Password
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare Passwords
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
