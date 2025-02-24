const jwt = require('jsonwebtoken');
const adminAuthMiddleware = (req, res, next) => {
  console.log(req.header('Authorization'));
  const [, token] = req.header('Authorization')?.split('Bearer ');
  if (!token) return res.status(401).json({ error: 'Access denied.' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified){
      req.admin = verified
      next();
    }
  } catch {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = adminAuthMiddleware;