import { Response, Router } from 'express';
import { readdirSync } from 'fs';
import { resolve } from 'path';
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
                    if (file !== 'Swagger.js') {
                        filelist.push(`build/routes/${file}`);
                    }
                }
            });

        return filelist;
    }

    public getRouter(): Router {

        /**
         * Generate API documentation from JSDOCS comments.
         *
         * Comments specifications.
         *
         * @link https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/yaml
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
