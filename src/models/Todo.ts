import {Schema, model, Document, Model} from 'mongoose';

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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export interface ITodo {
    title: string,
    content: string,
    slug: string,
    priorityLevel?: string,
    createdOn?: Date,
    updatedOn?: Date,
    isComplete?: boolean,
    userId?: string
}

export interface ITodoModel extends ITodo, Document {
    getTodos();
    getTodoBySlug(slug: string);
    getTodosByUserId(userId: string);
    createTodo(newTodo: ITodoModel);
    updateTodo(id: string, updatedTodo: ITodoModel);
    deleteTodo(slug: string);
}

// Todo Functions
TodoSchema.statics.getTodos = async () => {
    return await Todo.find().select('-__v');
}

TodoSchema.statics.getTodoBySlug = async (slug: string) => {
    const query = {slug: slug};
    return await Todo.findOne(query).select('-__v');
}

TodoSchema.statics.getTodosByUserId = async (userId: string) => {
    const query = {userId: userId};
    return await Todo.find(query).select('-__v').populate('userId').select('-__v -password');
}

TodoSchema.statics.createTodo = async (newTodo: ITodoModel) => {
    return await newTodo.save();
}

TodoSchema.statics.updateTodo = async (id: string, updatedTodo: ITodoModel) => {
    return await Todo.findByIdAndUpdate(id, updatedTodo);
}

TodoSchema.statics.deleteTodo = async (slug: string) => {
    const query = {slug: slug};
    return await Todo.findOneAndRemove(query);
}
const Todo: Model<ITodoModel> = model<ITodoModel>("Todo", TodoSchema);
export default Todo;