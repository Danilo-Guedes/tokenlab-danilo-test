const jwt = require("jsonwebtoken");


async function createUserJWT(user) {
  const { id, name, email } = user;

  const payload = {
    id,
    name,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'AnRandomSaltText', {
    expiresIn: "7d",
    // expiresIn: "5000",
  });

  console.log({token});

  return token;
}

async function decodeJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'AnRandomSaltText');
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Handle token expiration error
      console.log('Token has expired');
    } else {
      // Handle other JWT verification errors
      console.log('Invalid token');
    }
    return null;
  }
}

module.exports = { createUserJWT, decodeJWT };