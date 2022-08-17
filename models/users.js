const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.statics.login = async function(username,password){

    const userD = await this.findOne({username})

    
    if(userD){
        const auth = await bcrypt.compare(password,userD.password)
        if(auth){
            return userD
        }else{
            throw Error('parol xetasi')
        }
    }else{
        throw Error('Istifadeci Tapilmadi')
    }
}


userSchema.pre('save', async function(next){
    const salt =  await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = new mongoose.model('user',userSchema)

module.exports = User