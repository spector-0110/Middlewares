const express=require("express");

const app=express();

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


function errorWare (err, req, res, next) {
    console.error(err.stack)
    res.status(666).send('Explicitely error thrown!')
}

const middlewareCheck=[middlewareCheckAge,middlewareCheckTicket];
app.get('/ride3' ,middlewareCheck ,(req , res) => {
    // wrong code here we cant downlaod a variable handled in error middleware
    res.status(200).download({ride:"you are on ride 3"});
});


app.use(errorWare);

app.listen(3000);