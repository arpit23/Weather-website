const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const request=require('request');
const apiKey='220bdb799d6b49b3905ce0419c071f9d';

const port="3000";
const localhost="localhost";

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=> {
    res.render('index',{weather:null,error:null});
});

app.post("/",(req,res)=>{
    let city=req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url,(err,response,body)=>{
        if(err){
            res.render('index',{weather:null,error:'Error,please try again'});
        }
        else {
            let weather=JSON.parse(body);
            if(weather.main==undefined){
                res.render('index',{weather:null,error:'Error,please try again'});
            }
            else {
                let TypeMessage=`It's ${weather.main.temp} degress in ${weather.name}!`;
                res.render('index',{weather:TypeMessage,error:null});
            }
        }

    });
    
});

app.listen(port,localhost,()=>{
    console.log("you are successfully connected");
});