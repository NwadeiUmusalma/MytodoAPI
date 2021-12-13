import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectdb.js";
import { Todo } from "./schema/todoSchema.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

connectDB();
app.use(cors());

app.use(express.json());

app.post("/todos", async (req, res) => {
  const { title, description, date_time } = req.body;
  const todo = await Todo.create({
    title,
    description,
    date_time,
  });

  if (todo) {
    return res.status(201).json({
      success: true,
      date: todo,
      message: "Todo created",
    });
  } else {
    return res.status(401).json({
      message: "Todo not created",
      success: false,
    });
  }
});

app.get("todos",async (req, res) => {
    const todo =await Todo.find();
    if(todo) {
        return res.status(200).json({
            success:true,
            data: todo,
            message: "Todos retrieved successfully",
        });
    } else {
            return res.status(500).json({
                success:false,
                message:"todo not rtrievsd",
            });
        }})
        
app.patch("/todos:id",async (req, res) =>{
    const { id }=req.params;
    const { status }=req.body;
    const todo= await Todo.updateOne({ status}).where({ _id: id});
    if (todo){
        return res.status(200).json({
            success:true,
            data: todo,
            message:"Todo updated successfully",
        })
    }
        else{
            return res.status(500).json({
                success:false,
                message:"Todo updated fail",
            })

        }}
)


app.delete("/todos/:id",async (req, res) => {
  const { id } = req.params;
  await Todo.deleteone({_id: id });
  if(Todo){
      
  return res.status(200).json({
    
    message:"Todo deleted successfully"
})

  }
  else{
      
  return res.status(500).json({
    message:"Todo deleted fail"
})
  }
  });


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
