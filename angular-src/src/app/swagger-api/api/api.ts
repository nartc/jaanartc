export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './todo.service';
import { TodoService } from './todo.service';
export const APIS = [AuthenticationService, TodoService];
