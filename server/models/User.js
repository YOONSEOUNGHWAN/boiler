const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//자릿수 제한 salt
const saltRounds = 10;
//JWT
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//하기전에 할 일
userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        //암호화(salt사용)
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            });
        });
    }else{
        next()
    }
})

userSchema.methods.comparePassWord = function(plainPassWord, cb){
    //plainPassWord 1234567 DBPW: hash
    console.log(this.password)
    bcrypt.compare(plainPassWord, this.password, function(err,isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //JWT이용
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode
    jwt.verify(token,'secretToken', function(err, decoded){
        //유저 아이디
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err)return cb(err);
            cb(null,user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }