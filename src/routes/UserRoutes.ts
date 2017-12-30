import {Router} from 'express';
import {UserController} from '../controllers/UserController';

export class UserRoutes {
    router: Router;
    userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.routes();
    }


    routes() {
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
         *     description: Successfully Registered an User
         *     schema:
         *      $ref: "#/definitions/RegisterResponse"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.post('/register', this.userController.registerUser);

        /**
         * @swagger
         * /api/users/login:
         *  x-swagger-router-controller: UserController
         *  post:
         *   description: Login an User
         *   operationId: login
         *   tags:
         *    - Authentication
         *   parameters:
         *    - $ref: "#/parameters/LoginParams"
         *   responses:
         *    200:
         *     description: Successfully Logged In
         *     schema:
         *      $ref: "#/definitions/LoginResponse"
         *    500:
         *     description: Mongo Error Response
         *     schema:
         *      $ref: "#/definitions/MongoErrorResponse"
         *    default:
         *     description: Error Response
         *     schema:
         *      $ref: "#/definitions/ErrorResponse"
         */
        this.router.post('/login', this.userController.login);
    }
}
