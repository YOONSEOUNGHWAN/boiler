const express = require('express')
const app = express()
const port = 5001

// DB
const mongoose = require('mongoose')
mongoose.connect(
  "mongodb://localhost:27017/boiler"
// mongoose6.0이상은 디폴트로 지원
  // {
  //   useNewUrlParser:true,
  //   useFindAndModify:false,
  //   useUnifiedTopology:true,
  //   useCreateIndex:true,
  // }
).then(()=>console.log('MongoDb connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~@@~~~~')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})