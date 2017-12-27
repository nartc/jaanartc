import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

import { ITodo, Todo } from '../models/Todo';
import { IUser } from '../models/User';

export class TodoController {
    async createTodo(req: Request, res: Response): Promise<Response> {
        const currentUser: IUser = req.user;

        if (!currentUser) return TodoController.resolveErrorResponse(res, 'Not Authorized', 403);

        const titleInput: string = req.body.title;
        const contentInput: string = req.body.content;
        const priorityLevel: string = req.body.priorityLevel ? req.body.priorityLevel : 'Low';
        let slugInput: string = titleInput.replace(/\s+/g, '-').toLowerCase();

        const newTodo: ITodo = new Todo({
            title: titleInput,
            content: contentInput,
            priorityLevel: priorityLevel
        });

        const lastSix = newTodo._id.toString().slice(-6);
        newTodo.slug = slugInput.concat(`-${lastSix}`);
        newTodo.userId = currentUser._id;
        currentUser.todoIds.push(newTodo._id);
        currentUser.save();

        const result: ITodo | MongoError = await Todo.createTodo(newTodo);

        return TodoController.resolveResponse(res, result);
    }

    async updateTodo(req: Request, res: Response): Promise<Response> {
        const todo: ITodo = req.body.todo;
        const result: ITodo | MongoError = await Todo.updateTodo(todo._id, todo);
        
        return TodoController.resolveResponse(res, result);
    }

    async getAllTodos(req: Request, res: Response): Promise<Response> {
        const result: ITodo[] | MongoError = await Todo.getTodos();

        return TodoController.resolveResponse(res, result);
    }

    async getSingleTodo(req: Request, res: Response): Promise<Response> {
        const slugParam: string = req.params.slug ? req.params.slug : null;

        if ((typeof(slugParam)) === 'undefined' && !slugParam) return TodoController.resolveErrorResponse(res, 'Slug param cannot be empty', 404);

        const result = await Todo.getTodoBySlug(slugParam);
        
        return TodoController.resolveResponse(res, result);
    }

    async deleteTodo(req: Request, res: Response): Promise<Response> {
        const id: string = req.body.id ? req.body.id : null;

        if ((typeof(id)) === 'undefined' && !id) return TodoController.resolveErrorResponse(res, 'ID cannot be empty', 404);

        const result = await Todo.deleteTodo(id);

        return TodoController.resolveResponse(res, result);
    }

    private static resolveErrorResponse(res: Response, message: string, statusCode: number): Response {
        return res.status(statusCode).json({
            status: statusCode,
            message: message
        });
    }

    private static resolveResponse(res: Response, result: ITodo | ITodo[] | MongoError = null) : Response {
        if (result instanceof MongoError) {
            return res.status(500).json({
                status: 500,
                mongoError: result.code,
                message: result.message,
                error: result.name
            });
        }

        if ((typeof(result)) === 'undefined' && !result) {
            return res.status(res.statusCode).json({
                status: res.statusCode,
                message: res.statusMessage
            });
        }

        return res.status(res.statusCode).json({
            status: res.statusCode,
            result: result
        });
    }
}