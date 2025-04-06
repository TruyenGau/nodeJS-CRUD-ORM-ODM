require('dotenv').config();
const express = require("express");
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const connection = require('./config/database');
const apiRoutes = require('./routes/api')



const app = express();
const post = process.env.PORT;
const hostname = process.env.HOST_NAME;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//config tenplate view engine
configViewEngine(app);

//khai bao route
app.use('/', webRoutes);
app.use('/v1/api', apiRoutes);




(async () => {
    try {
        await connection();
        app.listen(post, () => {
            console.log(`Example app ${post}`)
        })
    } catch (error) {
        console.log('>>>Error connection to: ', error);
    }
})()


