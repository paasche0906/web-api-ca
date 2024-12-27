import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error('No authorization header');

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error('Bearer token not found');

        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ username: decoded.username });
        if (!user) throw new Error('User not found');

        req.user = { id: user._id, username: user.username }; // 附加 userId 到请求对象
        next();
    } catch (err) {
        next(new Error(`Verification Failed: ${err.message}`));
    }
};


export default authenticate;