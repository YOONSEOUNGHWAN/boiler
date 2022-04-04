const{ User } = require('../models/User')



let auth = (req,res,next)=>{
    //인증 처리를 하는 곳

    //1.client-cookie에서 token확인
    let token = req.cookies.x_auth;

    //2.token 복호화
    User.findByToken(token, (err,user)=>{
        if(err)throw err;
        if(!user) return res.json({isAuth:false, error:true})
        //반환값에서 사용하려고
        req.token = token;
        req.user = user;
        
        next();
    })

    //3.유저가 있으면 인증ok

    //4.없으면 no


}

module.exports = { auth };