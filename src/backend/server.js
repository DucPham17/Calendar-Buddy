const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter')
const eventRouter = require('./router/eventRouter')
const dotenv = require('dotenv');
const config = require('./config');
const bodyParser = require('body-parser');
dotenv.config();

const mongodbUrl = config.MONGODB_URL;
//console.log(mongodbUrl);
app.use(bodyParser.json());
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(error
));
app.use("/api/users",userRouter);
app.use("/api/event", eventRouter);

app.listen(5000, () => {
    console.log("server started at port 5000")
}) 