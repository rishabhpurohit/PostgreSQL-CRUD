const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json())// -> req.body

//ROUTES//

//get all todos
app.get("/todos",async (req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch(err){
        console.log(err);
    }
} )

//get a todo
app.get("/todos/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[
            id
        ]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
} )
//create a todo
app.post("/todos",async (req,res)=>{
    try{
        //await
        const {description} = req.body;
        const newTODO = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]);
        res.json(newTODO.rows[0]);
    }catch(err){
        console.log(err.message)
    }
})


//update a todo

app.put("/todos/:id" , async (req,res)=>{
    try{
        const {id} = req.params; //WHERE
        const {description} = req.body; // SET

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description,id]
        );
        res.json("Todo was Updated!")
    }catch(err){
        console.log(err.message);

    }
})

//delete a todo


app.delete("/todos/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteTODO = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("todo was deleted successfully");
    }catch(err){
        console.log(err.message);
    }
})
port = 3000;
app.listen(port,()=>{
    console.log("Server is up and running on " + port)
})