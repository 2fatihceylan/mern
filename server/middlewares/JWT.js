const {sign, verify} = require('jsonwebtoken');

const User = require('../models/userModel');



const createToken = (user) => {
    const accessToken = sign(
        {
            name: user.name,
            id: user.id
        },process.env.JWT_TOKEN_SECRET
    );

    return accessToken;
}



const validateToken = async(req, res, next) => {

    const accessToken = req.cookies['access-token'];


    if(!accessToken){
        return res.status(400).json({error: 'User_not_authenticated'});
    }

    try{
        const validToken = verify(
            accessToken,
            process.env.JWT_TOKEN_SECRET
        )

        if(validToken) {
            req.authenticated = true;


            req.user = await User.findById(validToken.id).select('-password')

            return next();
        }
    }
    catch(err) {
        return res.status(400).json({error: err});
    }
}


module.exports = { createToken, validateToken}