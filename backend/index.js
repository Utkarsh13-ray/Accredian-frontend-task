const connectToMongo=require('./db');
const express = require('express')
var cors=require('cors')
connectToMongo();
const app = express()
const port = process.env.PORT || 5000


const dotenv = require('dotenv')
dotenv.config() 



app.use(express.json());// middleware used to take data in json in express for use req.body
app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hello Utkarsh!')
// })
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})