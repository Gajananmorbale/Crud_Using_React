import express from "express"
import mysql from "mysql2"
import cors from "cors"



const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Gajax',
  database : 'crud'
});
db.connect();

app.get("/",(req,res)=>{
    const sql = "select * from student";

    db.query(sql,(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.post("/create",(req,res)=>{
    const sql = "insert into student(name,author,date) values (?)";
    const values = [req.body.name,req.body.author,req.body.date];

    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.put("/update/:id",(req,res)=>{
    const sql = "update student set name = ?, author = ?, date = ? where id = ?";
    const values = [req.body.name,req.body.author,req.body.date];
    const id = req.params.id;

    db.query(sql,[...values,id],(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})

app.delete("/delete/:id",(req,res)=>{
    const sql = "delete from student where id = ?";
    const id = req.params.id;

    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})


app.get('/getrecord/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'select * from student where id = ?';
    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})


app.listen(3030,()=>{
    console.log("server is running on port 3030")
})