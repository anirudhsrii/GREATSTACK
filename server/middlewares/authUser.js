import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json({success: false, message: 'Unauthorized access'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.user = {userId: tokenDecode.id};
        }else{
            return res.json({success: false, message: 'Unauthorized access'});
        }
        next();

    } catch(error) {
        res.json({success: false, message: error.message});

    }
}

export default authUser;