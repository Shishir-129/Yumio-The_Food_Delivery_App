// for decoding JWT tokens and verifying user authentication
// When someone logs in → gets a token → uses that token to add items to cart, place orders, etc. Without the token, the server rejects their request.

import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success: false,message: "Not Authorized. Login Again!"})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET); // decode and verify token using secret key
        if (!req.body) req.body = {}; // initialize req.body if undefined
        req.body.userId = token_decode.id; // the middleware takes the token, converts it to user ID, and using that ID, allows the user to perform actions like adding to cart, placing orders, etc.
        next(); // proceed to the next middleware or controller
    } catch (error) {
        console.log("JWT Verification Error:", error.message)
        console.log("JWT_SECRET:", process.env.JWT_SECRET)
        console.log("Token:", token)
        res.json({success: false,message:"Error!", errorDetails: error.message})
    }
}

export default authMiddleware;