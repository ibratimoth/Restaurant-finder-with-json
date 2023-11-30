const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
 const path=require('path');
 const fs=require('fs');
 const uuid=require('uuid');
const app=express();
const defaultRoutes=require('./routes/default');
const restaurantsRoutes=require('./routes/restaurantss');
const { error } = require('console');


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
 app.use(express.static('public'));
 app.use(express.urlencoded({extended: false}));

 app.use('/',defaultRoutes);

 app.use('/',restaurantsRoutes);

app.use(function(req,res){
    res.status(404).render('404');
})
app.use(function(error,req,res,next){
    console.log(error);
    res.status(500).render('500');
})
// dotenv.config({path:'./conf.env'});

// console.log(process.env);

// mongoose.connect(process.env.LOCAL_CONN_STR,{
//     useNewUrlParser:true
// }).then((conn)=>{
//     console.log(conn);
//     console.log('DB connection succesfull');
// })

app.listen(3002);