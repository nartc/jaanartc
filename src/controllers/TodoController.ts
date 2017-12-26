import {Request, Response} from "express";
import {Error} from 'mongoose';
import Todo, {ITodoModel} from "../models/Todo";

export class TodoController {
    todo: ITodoModel;
    async createTodo(req: Request, res: Response) {
        const titleInput: string = req.body.title;
        const contentInput: string = req.body.content;
        const priorityLevel: string = req.body.priorityLevel ? req.body.priorityLevel : 'Low';
        let slugInput: string = titleInput.replace(/\s+/g, '-').toLowerCase();

        const newTodo: ITodoModel = new Todo({
            title: titleInput,
            content: contentInput,
            priorityLevel: priorityLevel
        });

        const lastSix = (newTodo._id as string).toString().slice(-6);
        newTodo.slug = slugInput.concat(`-${lastSix}`);
        const todo = await Todo.createTodo(newTodo);

        if (!todo) TodoController.resolveErrorResponse(res, 'Error creating new todo', res.statusCode);

        return res.status(res.statusCode).json({
            status: res.statusCode,
            result: todo
        });
    }

    private static resolveErrorResponse(res: Response, message: string, statusCode: number, error: Error = null) {
        return res.status(statusCode).json({
            status: statusCode,
            message: message,
            error: error ? error : null
        });
    }
}