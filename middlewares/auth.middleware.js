import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// step 1: is this request carrying a valid token at all?
export const verify_token = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "authorization token is required"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        // throws if the signature is wrong or the token has expired
        const payload = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findByPk(payload.id)
        if (!user) {
            return res.status(401).json({
                message: "invalid or expired token"
            })
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "this account has been deactivated"
            })
        }

        req.user = { id: user.id, email: user.email, role: user.role }
        next()
    } catch (error) {
        return res.status(401).json({
            message: "invalid or expired token"
        })
    }
}

// step 2: the token is valid, but is this person an admin?
export const is_admin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "admin access required"
        })
    }

    next()
}
