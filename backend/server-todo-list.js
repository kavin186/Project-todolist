const express=require ('express')
const mongoose = require('mongoose')
const app=express()
var { v4:uuid } = require('uuid')
var fs = require('fs/promises')
const mongodb = require('mongodb')
app.use(express.json())
mongoose.set('strictQuery' ,false);
const cors = require("cors");

app.options("*", cors({  optionsSuccessStatus: 200 }));

app.use(cors({  optionsSuccessStatus: 200 }));
//ewrg4e4g34wqg
 mongoose.connect('mongodb://database:27017:27017/work',
 {
    useNewUrlParser : true,
    useUnifiedTopology : true
 })
const db =mongoose.connection;
const schema = new mongoose.Schema({
 
  task:{
    type:String,
  },
  id: {
    type : String,
   },
  createdAt : {
  type: String,
   },
   completion_status : {
    type : Boolean,
   }
});

const tab = mongoose.model("task", schema);
const coll = db.collection("task")


app.post('/task',async (req,res)=>{
 try{
    console.log("enters")
  let taskadd = {
    ...req.body,
    id : uuid(),
    created_at : new Date().toLocaleString(),
    completed : false,
    completed_at : ""
  }
  coll.insertOne(taskadd)
  res.send("success")
  //console.log("hi")
}
   catch (error){
    console.log(error);
    res.status(400).send("fail")
  }
})



app.listen(3000,function()
{
    console.log('App listening on port 3000')
})




app.get('/tasks', async function (req, res) {
    
        // var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://database:27017:27017/work";
     
        mongoose.connect(url, async function(err, db) {
          if (err) throw err;
         
        const result = await db.collection("task").find().toArray();
        res.send(result)
        });
     
     });




app.patch('/task/:id',async function (req,res){
        
        var url = "mongodb://database:27017:27017/work";
        const id = req.params.id
        mongoose.connect(url, function(err, db) {
          if (err) throw err;
          //var dbo = db.db("mydb");
          var myquery = { id: id };
          var newvalues = { $set: { completed: true, completed_at:new Date().toLocaleString() } };
          db.collection("task").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
           // db.close();
          });
        });
         })
     
    
 app.delete('/task/:id',async function (req,res){
        
        var url = "mongodb://database:27017:270177/work";
        const id = req.params.id
        mongoose.connect(url, function(err, db) {
          if (err) throw err;
          //var dbo = db.db("mydb");
          var myquery = { id: id };
          
          db.collection("task").deleteOne(myquery, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
           // db.close();
          });
        });
         })
 
         
    
         











// const express =require('express');
// const app=express();
// const mongoose = require("mongoose");
// //const Router = require("./routes")
// app.use(express.json())
// const { v4: uuidv4 } = require('uuid');
// mongoose.set('strictQuery', false);
// const fs=require('fs/promises')
// const cors = require("cors");

// app.options("*", cors({ origin: 'http://localhost:3001', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
// mongoose.connect('mongodb://localhost:27017/',
//   {
//     useNewUrlParser: true,
//     //useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// // If you receive a GET request with `url = '/test'`, always
// // send back an HTTP response with body 'ok'.
// app.get('/tasks', async function (req, res) {
// try{
//     const tasks=await listtasks()
//     res.send(tasks);
// }catch(error){
// res.status(500).send(error)
// }
 
// });

// async function listtasks(){
//     try{
//         const result=await fs.readFile('todo.json')
//         console.log("result",result.toString());
//         return JSON.parse(result.toString()) 
//     }
//     catch(error){
//         throw error
//     }
// }
// app.post('/collect/:name',function(req,res){
//     const namec = req.params.name
//     db.createCollection(namec , (err , collection) => {
//         if(err) throw err;
        
//         console.log("Details collection created successfully");
        
//     });

// })



// app.patch('/task/:id',async function (req,res){
//     const taskid=req.params.id
//     try{
//         const result=await marktaskcompletion(taskid)
//         result? res.send("success"):res.status(500).send("task not found")
//     }catch(error){
//         res.status(500).send(error)
//     }
// })
// async function marktaskcompletion(taskid){
//     try{
//         const result=await fs.readFile('todo.json')
//         console.log("result",result.toString());
//         let tasks=JSON.parse(result.toString())
//         let found=false
//         tasks.forEach(task=>{
//             if(task.id===taskid){
//                 found=true
//                 task.completed=true
//                 task.completion_time=new Date().toLocaleString()
//             }
//         })
//         if(found){
//             await fs.writeFile("todo.json",JSON.stringify(tasks))
//             return true
//         }
//         return false
//     }
//     catch(error){
//         throw error
//     }
// }
// app.delete('/delete/:id',async function(req,res){
//     const taskid=req.params.id;
//     const result=await fs.readFile('todo.json')
//         console.log("result",result.toString());
//         let tasks=JSON.parse(result.toString())
//         let found=false
//     tasks.forEach(async task=>{
//         if(task.id===taskid){

//             tasks.splice(tasks.indexOf(task),1);
//             found=true
//         }
//        if(found){
//        await fs.writeFile("todo.json",JSON.stringify(tasks))
//             return true
//        }
//        return false
//     }
//         )
// })
// app.post('/insert',async function(req,res){
//     let  newTask={
//         ...req.body,
//         id: uuidv4(),
//             created_at: new Date().toLocaleString(),
//             completed :false,
//             completion_time:"1234"
//         }
//         let collection_name=db.collection("collection_demo")
//         db.collection(collection_name).insertOne(newTask, function(err, res) {  
//             if (err) throw err;  
//             console.log("1 record inserted");  
//             db.close();  
//             });  
 
// })
// app.post('/task', async function(req, res) {
//     console.log("body",req.body);

//     let  newTask={
//         ...req.body,
//         id: uuidv4(),
//             created_at: new Date().toLocaleString(),
//             completed :false,
//             completion_time:"1234"
//         }
//         try{
//             await addtask(newTask)
//             res.s
//             end(newTask)
//         }
//         catch(error){
//             res.status(500).send(error)
//         }
//        // res.send(newTask)
// });

// async function addtask(task){
//     let tasks=[]
//     try{
//         const result=await fs.readFile('todo.json')
//         console.group("result",result.toString());
//         tasks=JSON.parse(result.toString())
//     }catch(error){
//         if(error.code!="ENOENT"){
//             throw error
//         }
//     }
//     try{
//         tasks =tasks.concat(task)
//         await fs.writeFile("todo.json",JSON.stringify(tasks))
//     }catch(error){
//         console.log("error",error);
//         throw error
//     }

// }
// app.listen(3000, function (){
//     console.log('App listening on port 3000!');
// });

