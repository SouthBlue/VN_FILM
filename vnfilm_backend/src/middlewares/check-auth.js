import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const checkAuthAdmin = (req, res, next) => {

    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.userData = decoded;
        if (decoded.role === 'admin'){
            next();
        } else {
            return res.status(403).json({
                message : "Permission denied"
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            message : "Auth failed"
        })
    }
};

export {checkAuthAdmin}; 