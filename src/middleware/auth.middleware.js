// const { verifyToken } = require("../helper/auth.helper");


// const authenticateUser = (req, res, next) => {
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Access denied. No token provided." });
//     }

//     const token = authHeader.split(" ")[1];

//     // console.log("Received Token:", token); 

//     try {

//         req.user = verifyToken(token);
//         next();
//     } catch (err) {
//         console.error("JWT Verification Error:", err.message);
//         return res.status(401).json({ error: "Invalid Token" });
//     }
// };

// module.exports = authenticateUser;






const AppError = require("../helper/AppError");
const { verifyToken } = require("../helper/auth.helper");


const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new AppError("No Token Provided", 401)
    }
    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticateUser;
