const jwt = require('jsonwebtoken');

const secret = 'ticketing-app-secret';
const expiration = '5h';
const test = 1;
module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    
    if (!token) {
      return req;
    }
    
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log(req.body);
    } catch (err) {
      console.error(err);
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ fullname, email, _id }) {
    const payload = { fullname, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
