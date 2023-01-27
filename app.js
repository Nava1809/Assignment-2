const express=require("express");
const mongoose=require("mongoose")
const InitialData=require("./models/InitialData")
const conn=require("./connetion/conn")
const bodyParser=require("body-parser")
conn();

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("Welcome to Api")
})
app.post("/posts",async(req,res)=>{
    try{
    const user=await InitialData.create(req.body)
    res.status(201).json({
        status:"success",
        user
    })
    }catch{
        res.status(500).json({
            status:"Failed",
        
            message:e.message
        })
    }
})

app.get("/posts",async(req,res)=>{
    try{
        const {id=0}=req.query;
        let users;
        if(id===0){
            users=await InitialData.find()

        }else{
            users=await InitialData.find({id:id})
        }
        //const users=await InitialData.find()
        res.status(200).json({
            status: "Success",
            users
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.get("/posts:id",async(req,res)=>{
    try{
    const user=await InitialData.find({_id : req.params.id})
    res.status(200).json({
        status:"success",
        user
    })
}catch(e){
    res.status(404).json({
        status:"Failed",
        message:e.message
    })
}
})

app.put("/posts/:id", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        await InitialData.updateOne({_id : req.params.id}, req.body);
        const user =  await InitialData.findOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
});

app.delete("/posts:id", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        const user = await InitialData.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(404).json({
            status: "Failed",
            message: e.message
        })
    }
});



app.listen(3000,()=>console.log("Server at port 3000"))