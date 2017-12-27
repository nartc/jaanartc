import * as passport from 'passport';
import { Router } from 'express';

import { TodoController } from '../controllers/TodoController';

export class TodoRoutes {
  router: Router;
  todoController: TodoController;

  constructor() {
    this.router = Router();
    this.todoController = new TodoController();
    this.routes();
  }

  routes() {
    this.router.get('/', this.todoController.getAllTodos);
    this.router.post('/create', passport.authenticate('jwt', { session: false }), this.todoController.createTodo);
    this.router.use(passport.authenticate('jwt', { session: false }))
      .route('/todo/:slug')
      .get(this.todoController.getSingleTodo)
      .put(this.todoController.updateTodo)
      .delete(this.todoController.deleteTodo);
  }
}