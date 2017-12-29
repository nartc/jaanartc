import {Router} from 'express';
import {UserController} from '../controllers/UserController';

// Swagger Definitions/Parameters/Responses
/**
 * @swagger
 * parameters:
 *  RegisterParams:
 *   name: RegisterParams
 *   in: body
 *   description: Request parameters for Register users
 *   schema:
 *    required:
 *     - userName
 *     - password
 *    properties:
 *     userName:
 *      type: string
 *      pattern: "[a-z0-9]{8,64}"
 *      minLength: 6
 *      maxLength: 64
 *     fullName:
 *      type: string
 *     password:
 *      type: string
 *      minLength: 6
 *      format: password
 *  LoginParams:
 *   name: LoginParams
 *   in: body
 *   description: Request parameters for Login user
 *   schema:
 *    required:
 *     - userName
 *    properties:
 *     userName:
 *      type: string
 *     password:
 *      type: string
 *      format: password
 * responses:
 *  RegisterResponse:
 *   name: RegisterResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    result:
 *     $ref: "#/definitions/UserVm"
 *  LoginResponse:
 *   name: LoginResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    result:
 *     $ref: "#/definitions/UserInformation"
 *  ErrorResponse:
 *   name: ErrorResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    message:
 *     type: string
 *  MongoErrorResponse:
 *   name: MongoErrorResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    mongoError:
 *     type: integer
 *     format: int32
 *    message:
 *     type: string
 *    error:
 *     type: string
 * definitions:
 *  UserVm:
 *   properties:
 *    userName:
 *     type: string
 *    fullName:
 *     type: string
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    lastVisited:
 *     type: string
 *     format: date-time
 *    todos:
 *     type: array
 *     items:
 *      $ref: "#/definitions/TodoVm"
 *  UserInformation:
 *   properties:
 *    userName:
 *     type: string
 *    fullName:
 *     type: string
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    lastVisited:
 *     type: string
 *     format: date-time
 *  TodoVm:
 *   properties:
 *    title:
 *     type: string
 *    content:
 *     type: string
 *    priorityLevel:
 *     type: string
 *     enum:
 *      - Low
 *      - Medium
 *      - High
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    isCompleted:
 *     type: boolean
 *    slug:
 *     type: string
 *    user:
 *     $ref: "#/definitions/UserInformation"
 */

export class UserRoutes {
    router: Router;
    userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.routes();
    }



    routes() {
// Swagger Definitions/Parameters/Responses
/**
 * @swagger
 * parameters:
 *  RegisterParams:
 *   name: RegisterParams
 *   in: body
 *   description: Request parameters for Register users
 *   schema:
 *    required:
 *     - userName
 *     - password
 *    properties:
 *     userName:
 *      type: string
 *      pattern: "[a-z0-9]{8,64}"
 *      minLength: 6
 *      maxLength: 64
 *     fullName:
 *      type: string
 *     password:
 *      type: string
 *      minLength: 6
 *      format: password
 *  LoginParams:
 *   name: LoginParams
 *   in: body
 *   description: Request parameters for Login user
 *   schema:
 *    required:
 *     - userName
 *    properties:
 *     userName:
 *      type: string
 *     password:
 *      type: string
 *      format: password
 * responses:
 *  RegisterResponse:
 *   name: RegisterResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    result:
 *     $ref: "#/definitions/UserVm"
 *  LoginResponse:
 *   name: LoginResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    result:
 *     $ref: "#/definitions/UserInformation"
 *  ErrorResponse:
 *   name: ErrorResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    message:
 *     type: string
 *  MongoErrorResponse:
 *   name: MongoErrorResponse
 *   properties:
 *    status:
 *     type: integer
 *     format: int32
 *    mongoError:
 *     type: integer
 *     format: int32
 *    message:
 *     type: string
 *    error:
 *     type: string
 * definitions:
 *  UserVm:
 *   properties:
 *    userName:
 *     type: string
 *    fullName:
 *     type: string
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    lastVisited:
 *     type: string
 *     format: date-time
 *    todos:
 *     type: array
 *     items:
 *      $ref: "#/definitions/TodoVm"
 *  UserInformation:
 *   properties:
 *    userName:
 *     type: string
 *    fullName:
 *     type: string
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    lastVisited:
 *     type: string
 *     format: date-time
 *  TodoVm:
 *   properties:
 *    title:
 *     type: string
 *    content:
 *     type: string
 *    priorityLevel:
 *     type: string
 *     enum:
 *      - Low
 *      - Medium
 *      - High
 *    createdOn:
 *     type: string
 *     format: date-time
 *    updatedOn:
 *     type: string
 *     format: date-time
 *    isCompleted:
 *     type: boolean
 *    slug:
 *     type: string
 *    user:
 *     $ref: "#/definitions/UserInformation"
 */

/**
 * @swagger
 * /api/users/register:
 *  x-swagger-router-controller: UserController
 *  post:
 *   description: Register an User
 *   operationId: registerUser
 *   tags:
 *    - Authentication
 *   parameters:
 *    - $ref: "#/parameters/RegisterParams"
 *   responses:
 *    200:
 *     description: Successfully Register an User
 *     schema:
 *      $ref: "#/responses/RegisterResponse"
 *    500:
 *     description: Mongo Error
 *     schema:
 *      $ref: "#/responses/MongoErrorResponse"
 *    default:
 *     description: Error
 *     schema:
 *      $ref: "#/responses/ErrorResponse"
 */
        this.router.post('/register', this.userController.registerUser);
        this.router.post('/login', this.userController.login);
    }
}
