const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

connectToMongo();
const app = express();
const port = 5000

app.use(cors());
app.use(express.json());

//Available Route
app.use('/api/auth', require('./routers/auth'))
app.use('/api/notes', require('./routers/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})