import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ;

export const protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. login to continue' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verifiedData = jwt.verify(token, JWT_SECRET);
        req.user = verifiedData; 

        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

