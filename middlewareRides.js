
const express= require("express");

const app=express();

let cnt=0;

function middlewareCheckAge(req,res,next) {
    if(req.query.age > 16) {
        cnt=cnt+1;
        next();
    }else {
        res.status(201).json({msg:"your age less than minimum age for the ride"});
    }
}

function middlewareCheckTicket(req,res,next) {
    if(req.query.type == 3) {
        next();
    }else {
        res.status(201).json({msg:"your ticket is not valid for the ride"});
    }
}

app.get("/cnt", (req,res) =>{
   return res.json({count:cnt});
});

// check age for all::
app.use(middlewareCheckAge);

app.get('/ride1', (req , res) => {
    res.status(200).json({ride:"you are on ride 1"});
});

app.get('/ride2' , (req , res) => {
    res.status(200).json({ride:"you are on ride 2"});
});

app.get('/ride3' ,middlewareCheckTicket ,(req , res) => {
    return res.status(200).json({ride:"you are on ride 3"});
});


app.listen(3000);