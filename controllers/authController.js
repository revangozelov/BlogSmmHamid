const User = require('../models/users')
const jwt = require('jsonwebtoken')
 
const maxAge = 60*60*24
const createToken = (id) => {
    console.log("token-id:" + id)
    return jwt.sign({id},'gizli kod',{expiresIn: maxAge})
}
const login_get  = (req,res) => {
    res.render('login',{title:"Giris"})
} 

const login_post = async (req,res) => {
    const { username,parol } = req.body
    try{
        console.log("user" + username + " pass" + parol)
        const user = await User.login(username,parol)
        const token = createToken(user._id)
        console.log("token:" + token)
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000})
        res.redirect('/admin')
    }
    catch(e){
        console.log(e)
        res.redirect('/login')
    }
}
const signup_get = (req,res) => {
    res.render('signup',{title:'qeyd'})
}
const signup_post = (req,res) => {

    const user = new User(req.body)
    user.save()
        .then((result) => {
            res.redirect('/login')
        })
        .catch((err) => {
            console.log(err)
        })
}
const logout = (req,res) => {
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/login')
}
module.exports = {
    login_get ,
    login_post,
    signup_get,
    signup_post,
    logout
}