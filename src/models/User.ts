import { Schema, model, Model, Document } from 'mongoose';

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  fullName: String,
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  lastVisited: Date,
  todoIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

interface ITodo extends Document {
  _id: Schema.Types.ObjectId,
  userName?: string,
  fullName?: string,
  password?: string,
  createdOn?: Date,
  updatedOn?: Date,
  lastVisted?: Date,
  todoIds?: Schema.Types.ObjectId[]
}

export interface ITodoModel extends Model<ITodo> {
  getTodos();
  getTodoBySlug(slug);
  createTodo(newTodo);
  updateTodo(updatedTodo);
  deleteTodo(slug);
  
}

export const User: Model<ITodo> = model('User', UserSchema);