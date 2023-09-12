const { default: mongoose } = require('mongoose')
const User = require('../models/createUser')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const loginControls = async (req, res) => {
    const {usermail, password} = req.body
    try{
    const existingUser = await User.findOne({usermail})
    if(!existingUser){
       return res.status(400).json({code: 'USER_NOT_FOUND', message: "Account does not wxist on our server"})
    }

    bcrypt.compare(password, existingUser.password, function (err, result){
        if(!result){
            return res.status(500).json({error: "Password is incorrect"})
        }
        const token = jwt.sign({data: existingUser}, "amabossbeaver4life", {expiresIn:'30m'})
        res.status(200).json({sessionToken: token})
        console.log(token)
    })

    }catch(err){
        res.status(500).json({code: "SERVER_ERROR", message: "An error occured"})
    }
}

const registerControls = async (req, res)=>{
    const {username, usermail, password} = req.body

    if(!usermail || !username || !password){
        return res.status(400).json({code: "BAD_REQUEST", message: "Invalid request parameters"})
    }

    bcrypt.hash(password, 10, async function (err, hashed){
        if(err){
            return console.log(err)
        }
        try{
        const existingUser = await User.findOne({usermail})

        if(existingUser){
            return res.status(500).json({code: "USER_EXIST", message: "User already exist"})
        }

        const responce = await User.create({username, usermail, password: hashed})
        res.status(200).json(responce)
        }catch(err){
            res.status(500).json({code: "SERVER_ERROR", message: "An error occured"})
        }
    })      
}

module.exports = {loginControls, registerControls} 