const express= require("express");
const cors=require("cors");
const app=express();

app.use(cors());
app.use(express.json());

app.post("/sum" , (req , res) => {
   try {
        let a = Number(req.body.input1);
        let b=Number(req.body.input2);
        let c=a+b;
        res.status(200).json({sum:c});

   } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});

   }
});

app.listen(3000 , () => {
    console.log("server is running on port 3000");
});