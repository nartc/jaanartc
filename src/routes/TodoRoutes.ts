import {Router} from "express";
import {TodoController} from "../controllers/TodoController";

export class TodoRoutes {
  router: Router;
  todoController: TodoController;

  constructor() {
    this.router = Router();
    this.todoController = new TodoController();
    this.routes();
  }

  routes() {
    this.router.post('/create', this.todoController.createTodo);
  }
}

const todoRoutes = new TodoRoutes();
todoRoutes.routes();

export default todoRoutes.router;