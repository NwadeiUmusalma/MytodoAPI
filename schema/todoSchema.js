import mongoose  from "mongoose";

const {Schema,model }= mongoose;

const todoSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false,
        require:true
    },
    date_time:{
        type:String,
        required:true
    }
});


const Todo=model('Todo',todoSchema);
export{Todo};
