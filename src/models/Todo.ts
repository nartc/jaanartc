import { MongoError } from 'mongodb';
import { Document, Model, model, Schema } from 'mongoose';

import { User } from './User';

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    priorityLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export interface ITodo extends Document {
    title: string,
    content: string,
    slug: string,
    priorityLevel?: string,
    createdOn?: Date,
    updatedOn?: Date,
    isComplete?: boolean,
    user?: string
}

export interface ITodoModel extends Model<ITodo> {
    getTodos();
    getTodoBySlug(slug: string);
    getTodosByUser(user: string);
    createTodo(newTodo: ITodo);
    updateTodo(id: string, updatedTodo: ITodo);
    deleteTodo(id: string);
}

TodoSchema.post('remove', async (todo: ITodo) => {
    const user = await User.findById(todo.user);
    user.todos.splice(user.todos.indexOf(todo._id), 1);
    user.save();
});

// Todo Functions
TodoSchema.static('getTodos', async () => {
    return await Todo.find()
        .select('-__v')
        .populate('user', '-__v -password')
        .then((result: ITodo[]) => result)
        .catch((error: MongoError) => error);
});

TodoSchema.static('getTodoBySlug', async (slug: string) => {
    const query = { slug };
    return await Todo.findOne(query)
        .select('-__v')
        .populate('user', '-__v -password')
        .then((result: ITodo) => result)
        .catch((error: MongoError) => error);
});

TodoSchema.static('getTodosByUser', async (user: string) => {
    const query = { user };
    return await Todo.find(query)
        .select('-__v')
        .populate('user', '-__v -password')
        .then((result: ITodo[]) => result)
        .catch((error: MongoError) => error);
});

TodoSchema.static('createTodo', (newTodo: ITodo) => {
    return Todo.create(newTodo)
        .then((result: ITodo) => result)
        .catch((error: MongoError) => error);
});

TodoSchema.static('updateTodo', async (id: string, updatedTodo: ITodo) => {
    return await Todo.findByIdAndUpdate(id, updatedTodo)
        .then((result: ITodo) => result)
        .catch((error: MongoError) => error);
});

TodoSchema.static('deleteTodo', async (id: string) => {
    return await Todo.findByIdAndRemove(id)
        .then((result: ITodo) => result)
        .catch((error: MongoError) => error);
});

export const Todo = model<ITodo>('Todo', TodoSchema) as ITodoModel;
