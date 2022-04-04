const express = require('express')
const app = express()
const port = 5001
//모델가져오기
const { User } = require('./models/User');
//body-parser
const bodyParser = require('body-parser');
//cookie-parser
const cookieParser = require('cookie-parser')
//중간자 가져오기
const { auth } = require('./middleware/auth')


//application/x-www-form-urlencoded 데이터 분석
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 데이터 분석
app.use(bodyParser.json());
app.use(cookieParser());


// DB
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost:27017/boiler"
  // mongoose6.0이상은 디폴트로 지원
  // {
  //   useNewUrlParser:true,
  //   useFindAndModify:false,
  //   useUnifiedTopology:true,
  //   useCreateIndex:true,
  // }
).then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('HI')
})

app.get('/api/hello',(req,res)=>{
  // console.log('hi')
  res.send('안녕~~~')
})



app.post('/api/user/register', (req, res) => {

  //회원가입 정보 client에서 가져온 것을 DB삽입
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/api/user/login', (req, res) => {
  //email검사 DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "유저없음"
      })
    }
    //있다면 PW검사
    user.comparePassWord(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "PW틀림" })
      }
      //맞다면 토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        //토큰을 저장한다. -> 쿠키/로컬/세션..
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })

  })
})

//미드웨어 -> 콜백하기전에 중간자역할
app.get('/api/user/auth', auth, (req,res)=>{
    //middleware를 통과했다면 -> authentication이 ture라는말
    res.status(200).json({
      _id: req.user._id,
      email:req.user.email,
      isAdmin: req.user.role === 0 ? false : true,
      name: req.user.name,
      lastname:req.user.lastname,
      image:req.user.image
    })
})

app.get('/api/user/logout', auth, (req,res)=>{
  User.findOneAndUpdate({_id:req.user._id},
    {token:""},
    (err,user)=>{
      if(err)return res.json({success:false, err});
      return res.status(200).send({
        success:true
      })
    })
})

app.listen(port, ()=>console.log(`Example app ${port}!`))
