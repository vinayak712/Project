import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

async function Protect(req,res,next) {
try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(400).json({ Message: 'Unauthorized -No Token Provided' });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        return res.status(400).json({Message:'Unauthorized -No Token Provided'})
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user ) {
        return res.status(400).json('User Not Found');
    }
    req.user = user;
    next();  //  to call the Update function
} catch (error) {
    res.status(400).json({Message:'Error Occures'+error.message})
}

}
export default Protect;