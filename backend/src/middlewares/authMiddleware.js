import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    let token;

    // The token comes from the Authorization header
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            return res.status(401).json({ message: "No token provide "});
        }
    }
};

export default authMiddleware;