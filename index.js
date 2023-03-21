const express = require('express')
const connection = require('./configuration/configDb');
const app = express()
require('dotenv').config();
const hrRoutes  = require('./modules/routes/hr.routes')
const port = process.env.PORT;

connection();

app.use(express.json());
app.use(hrRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))