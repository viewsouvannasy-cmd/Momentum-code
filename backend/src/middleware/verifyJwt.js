import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "not jwt in athHeader" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ msg: "verify token error" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyJwt;
