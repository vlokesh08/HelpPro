const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET , (err, verified) => {
            if(err){
                return res.status(401).json({ message: "Invalid Token" });
            }
            req.user = verified;
        }
        );
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = verifyUser;