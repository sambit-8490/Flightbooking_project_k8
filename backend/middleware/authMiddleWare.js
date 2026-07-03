const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized", message: err.message });
  }
};

const adminAuth = (req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden - Admin access required" });
    }
    req.userData = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized", message: err.message });
  }
};

module.exports = { auth, adminAuth };
