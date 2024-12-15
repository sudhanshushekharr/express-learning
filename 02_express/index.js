import 'dotenv/config'
import express from 'express'

const app=express()
const port=process.env.PORT || 3007
//  app.use(fucntion(req,res,next))
//  {
//     next();
//  }
app.get("/",(req,res)=>{
    res.send("Hello from Shekhar and his tea!")
})

app.get("/ice-tea",(req,res)=>{
    res.send("What ice tea would you prefer?")
})

app.get("/twitter",(req,res)=>{
    res.send("hiteshdotcom")
})

app.get("/profile/:username",(req,res)=>{
    res.send(`hello from ${req.params.username}`);
})
app.use(express.json())

let teaData=[]
let nextId=1
//post route to save data in database
//add a new tea
app.post('/teas',(req,res)=>{
    const {name,price}=req.body
    const newTea={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get("/teas",(req,res)=>{
    res.status(201).send(teaData);
})

//get a tea with id
app.get("/teas/:id",(req,res)=>{
    const tea=(teaData.find(t=>t.id === parseInt(req.params.id))) //anything comems from req.url is in string format
    if(!tea)
    {
        return res.status(404).send('tea not found')
    }
    res.status(200).send(tea);
})

//update tea

app.put('/teas/:id',(req,res)=>{

    const tea=(teaData.find(t=>t.id === parseInt(req.params.id)))
    if(!tea)
        {
            return res.status(404).send('tea not found')
        }
    const {name,price}=req.body
    tea.name=name;
    tea.price=price
    res.status(200).send(tea);
})

//delete tea

app.delete("/teas/:id",(req,res)=>{
   const index= teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1)
    {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1)
    return res.status(201).send("deleted");
})




app.listen(port,()=>{
    console.log(`server is running at port ${port}...`);
    
})