const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv/config');

app.use(bodyParser.json());

//Import Route
const productRoute = require('./api/routes/products');
//Routes setting up handle requests
app.use('/product', productRoute);

mongoose.connect("mongodb://dallysse-admin:Adolescents1992@cluster0-shard-00-00.g5iwm.mongodb.net:27017,cluster0-shard-00-01.g5iwm.mongodb.net:27017,cluster0-shard-00-02.g5iwm.mongodb.net:27017/prodServiceDB?ssl=true&replicaSet=atlas-j3w1ft-shard-0&authSource=admin&retryWrites=true&w=majority",  { useNewUrlParser: true, useUnifiedTopology: true} ,(err) =>
{
    if(err){
        console.log("Could not connect to Mongo DB (Data Center) ");
    }else {
        console.log("DATA CENTER - Connected")
    }
});// CONNECTING TO MONGODB

//having'/uploads' in front of express.static will allow more specific URL destination
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method=== 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//app.use sets up middleware
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.use((req, res, next) => {
    res.status(200).json({
        message: "It works!"
    });
});
//mongo "mongodb+srv://cluster0.g5iwm.mongodb.net/produktServiceDB" --username dallysse-admin
//"mongodb+srv://dallysse-admin:Adolescents1992@cluster0.g5iwm.mongodb.net/produktServiceDB"

module.exports = app;
