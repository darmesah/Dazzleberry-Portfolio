const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      const error = new Error('Not authenticated. ');
      error.statusCode = 401;
      throw error;
    }

    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;

    decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      const error = new Error('Not authenticated. ');
      error.statusCode = 500;
      throw error;
    }

    req.adminId = decodedToken.adminId;
    req.adminName = decodedToken.name;
    req.role = decodedToken.role;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

  next();
};
