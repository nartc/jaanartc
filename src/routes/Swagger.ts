import {Response, Router} from 'express';
import {readdirSync} from 'fs';
import {resolve} from 'path';
import swaggerJSDoc = require('swagger-jsdoc');

export class APIDocsRouter {

    private router: Router = Router();

    private static getAllRoutes(dir: string, filelist: string[]): string[] {

        const files = readdirSync(dir);
        filelist = filelist || [];

        files
            .map((file) => {

                // filter out .map and hidden files
                if (file.search('.map') < 0 && file.search(/^\./) < 0) {
                    filelist.push(`build/routes/${file}`);
                }
            });

        return filelist;
    }

    public getRouter(): Router {

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
         *  NewTodoParams:
         *   name: NewTodoParams
         *   in: body
         *   description: Create New Todo Params
         *   schema:
         *    required:
         *     - title
         *     - content
         *    properties:
         *     title:
         *      type: string
         *     content:
         *      type: string
         *     priorityLevel:
         *      type: string
         *      enum:
         *       - Low
         *       - Medium
         *       - High
         *      default: "Low"
         *
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
         *  RegisterResponse:
         *   properties:
         *    status:
         *     type: integer
         *     format: int32
         *    result:
         *     $ref: "#/definitions/UserVm"
         *  LoginResponse:
         *   properties:
         *    status:
         *     type: integer
         *     format: int32
         *    authToken:
         *     type: string
         *    result:
         *     $ref: "#/definitions/UserInformation"
         *  TodoResponse:
         *   properties:
         *    status:
         *     type: integer
         *     format: int32
         *    result:
         *     $ref: "#/definitions/TodoVm"
         *  ErrorResponse:
         *   properties:
         *    status:
         *     type: integer
         *     format: int32
         *    message:
         *     type: string
         *  MongoErrorResponse:
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
         */

        this.router.get('/api/docs/swagger.json', (_: {}, response: Response) => {

            const urls: string[] = [];

            APIDocsRouter.getAllRoutes(resolve(__dirname), urls);

            const options = {
                swaggerDefinition: {
                    info: {
                        title: 'JAANartc',
                        version: '1.0.0',
                        description: 'JAANartc OpenAPI Documentations'
                    },
                    host: 'localhost:3000',
                    basePath: '/',
                    tags: [
                        {
                            name: 'Authentication',
                            description: 'Authentication Routes'
                        },
                        {
                            name: 'Todo',
                            description: 'Todo Routes'
                        }
                    ],
                    schemes: ['http', 'https'],
                    securityDefinitions: {
                        JWT: {
                            type: 'apiKey',
                            name: 'Authorization',
                            in: 'header'
                        }
                    },
                    consumes: ['application/json'],
                    produces: ['application/json']
                },
                apis: urls
            };

            response.setHeader('Content-Type', 'application/json');
            response.send(swaggerJSDoc(options));
        });

        return this.router;
    }
}
