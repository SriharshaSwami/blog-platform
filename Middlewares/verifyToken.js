import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        // read token from cookies (requires cookie-parser in server)
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized req. Plz login first" })
        }

        // verify and decode token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // attach decoded payload to request for downstream handlers
        req.user = decodedToken

        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please login again.' })
        }
        return res.status(401).json({ message: 'Invalid token. Please login.' })
    }
}
