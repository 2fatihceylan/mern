const {createToken} = require('../middlewares/JWT')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const registerUser = asyncHandler(async(req, res)=>{

    const {name, email, password} = req.body;

    if(!name||!email||!password){
        res.status(400);
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword
        }
    )

    if(user) {

        const accessToken = createToken({name: user.name, id: user.id})

        res.cookie('access-token',accessToken,{
            maxAge: 60*60*24*1000,
            httpOnly: true
        })

        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        )
    }
    else{
        res.status(400);
        throw new Error('Invalid user data')
    }

})


const loginUser = asyncHandler(async(req, res)=>{
    
    const {email, password} = req.body;

    if(!email||!password){
        res.status(400);
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({email});

    if(user &&(await bcrypt.compare(password,user.password))){


        const accessToken = createToken({name: user.name, id: user.id})

        res.cookie('access-token',accessToken,{
            maxAge: 60*60*24*1000,
            httpOnly: true
        })

        res.json(
            {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        )
    }
    else{
        res.status(400);
        throw new Error('Invalid email or password')
    }
})

const getMe = asyncHandler(async(req, res)=>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json(
        {
            id: _id,
            name,
            email
        }
    )
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}