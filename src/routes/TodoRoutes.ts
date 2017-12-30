import * as passport from 'passport';
import {Router} from 'express';

import {TodoController} from '../controllers/TodoController';

export class TodoRoutes {
    router: Router;
    todoController: TodoController;

    constructor() {
        this.router = Router();
        this.todoController = new TodoController();
        this.routes();
    }

    routes() {
        /**
         * @swagger
         * /api/todos:
         *  x-swagger-router-controller: TodoController
         *  get:
         *   description: Get all todos
         *   operationId: getAllTodos
         *   tags:
         *    - Todo
         *   responses:
         *    200:
         *     description: Successfully fetched all todos
         *     schema:
         *      type: array
         *      items:
         *       $ref: "#/definitions/TodoVm"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.get('/', this.todoController.getAllTodos);

        /**
         * @swagger
         * /api/todos/my-todos:
         *  x-swagger-router-controller: TodoController
         *  get:
         *   description: Get all todos by User
         *   operationId: getTodosByUser
         *   security:
         *    - JWT: []
         *   tags:
         *    - Todo
         *   responses:
         *    200:
         *     description: Successfully fetched all todos by User
         *     schema:
         *      type: array
         *      items:
         *       $ref: "#/definitions/TodoVm"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.get('/my-todos', passport.authenticate('jwt', {session: true}), this.todoController.getTodosByUser);

        /**
         * @swagger
         * /api/todos/create:
         *  x-swagger-router-controller: TodoController
         *  post:
         *   description: Create new Todo
         *   operationId: createTodo
         *   security:
         *    - JWT: []
         *   tags:
         *    - Todo
         *   parameters:
         *    - $ref: "#/parameters/NewTodoParams"
         *   responses:
         *    200:
         *     description: Successfully created todo
         *     schema:
         *      $ref: "#/definitions/TodoResponse"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.post('/create', passport.authenticate('jwt', {session: false}), this.todoController.createTodo);

        /**
         * @swagger
         * /api/todos/todo/{slug}:
         *  x-swagger-router-controller: TodoController
         *  get:
         *   description: Get a single Todo
         *   operationId: getSingleTodo
         *   security:
         *    - JWT: []
         *   tags:
         *    - Todo
         *   parameters:
         *    - name: slug
         *      in: path
         *      required: true
         *      description: Todo slug
         *      type: string
         *   responses:
         *    200:
         *     description: Successfully fetched todo
         *     schema:
         *      $ref: "#/definitions/TodoVm"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.use(passport.authenticate('jwt', {session: false}))
            .route('/todo/:slug')
            .get(this.todoController.getSingleTodo);

        /**
         * @swagger
         * /api/todos/todo/{id}:
         *  x-swagger-router-controller: TodoController
         *  put:
         *   description: Update a single Todo
         *   operationId: updateTodo
         *   security:
         *    - JWT: []
         *   tags:
         *    - Todo
         *   parameters:
         *    - name: Todo Id
         *      in: path
         *      required: true
         *      description: Todo ID
         *      type: string
         *    - name: Updated Todo
         *      in: body
         *      required: true
         *      description: Updated Todo data
         *      schema:
         *       $ref: "#/definitions/TodoVm"
         *   responses:
         *    200:
         *     description: Successfully updated todo
         *     schema:
         *      $ref: "#/definitions/TodoVm"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         *  delete:
         *   description: Remove a Todo
         *   operationId: deleteTodo
         *   security:
         *    - JWT: []
         *   tags:
         *    - Todo
         *   parameters:
         *    - name: Todo Id
         *      in: path
         *      required: true
         *      description: Todo ID
         *      type: string
         *   responses:
         *    200:
         *     description: Successfully deleted todo
         *     schema:
         *      $ref: "#/definitions/TodoVm"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.use(passport.authenticate('jwt', {session: false}))
            .route('/todo:id')
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo);

    }
}
