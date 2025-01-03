const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user; // Save the user info from the token to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
