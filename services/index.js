import {ToDoModel} from '../models';

export const saveTodo = ({task, status}) => {  
    return ToDoModel.create({task, status});
}

export const doneTodo = (id) => {    
    return ToDoModel.findByIdAndUpdate(id, {$set: {status : 'done'}}, {new : false});
}

export const deleteTodo = (id) => {
    return ToDoModel.remove({_id : id});
}

export const getAllTodo = () => {
    return ToDoModel.find();
}