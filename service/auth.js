var jwt = require('jsonwebtoken')
var privateKey = "ravi@123"

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
  }, privateKey);
}

function getUser(token) {
  if(!token) return null;
  try {
    return jwt.verify(token, privateKey);
  } catch (error) {
    return null
  }
  
}

module.exports = {
  setUser,
  getUser,
};