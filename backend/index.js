const express = require("express");
const rootRouter = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
//if the request comes to /api/v1 go to rootrouter
app.use('/api/v1',rootRouter);
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is Running");
})
