import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todolist');

let ToDo = new Schema({
    id : Schema.ObjectId,
    task : String,
    status : String
});

export const ToDoModel = mongoose.model('ToDo', ToDo);

