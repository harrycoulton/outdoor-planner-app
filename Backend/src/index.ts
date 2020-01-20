import express from 'express'
import bodyParser from 'body-parser'
import {DaytimeData} from './controllers/DaytimeData'

const cors = require('cors')

const app = express();
const port = 2000;
const jsonParser = bodyParser.json()

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  let latitude = parseFloat(req.query.latitude)
  let longitude = parseFloat(req.query.longitude)
  let date = req.query.date
    let dayOneData = new DaytimeData()
    let data = await dayOneData.compileDaytimeData(latitude, longitude, date)
    res.send(data)
})

// app.post('/', jsonParser, async function(req, res){
//   let coords = req.body
//   let dayOneData = new DaytimeData()
//     let data = await dayOneData.compileDaytimeData(coords.data.latitude, coords.data.longitude, coords.data.date)
//     res.send(data)
//   res.send(req.body)
//   })


app.listen(port, err => {
  if (err) {
    return console.error(err); 
  }
  return console.log(`server is listening on ${port}`);
});