import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import {Request, Response} from 'express';
import {IUser, User} from '../models/User';
import {MongoError} from 'mongodb';
import {coreConfig} from '../config/keys';

export class UserController {

    private static resolveErrorResponse(res: Response, message: string, statusCode: number): Response {
        return res.status(statusCode).json({
            status: statusCode,
            message
        });
    }

    private static resolveResponse(res: Response, result: IUser | MongoError = null): Response {
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
            result
        });
    }

    async registerUser(req: Request, res: Response): Promise<Response> {
        const userNameInput: string = req.body.userName;
        const fullNameInput: string = req.body.fullName;
        const passwordInput: string = req.body.password;

        if (!userNameInput || !passwordInput) {
            return UserController.resolveErrorResponse(res, 'Username and Password cannot be emptied', 400);
        }

        const newUser: IUser = new User({
            userName: userNameInput,
            fullName: fullNameInput,
            password: passwordInput
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        const result = await User.createUser(newUser);

        return UserController.resolveResponse(res, result);
    }

    async login(req: Request, res: Response): Promise<Response> {
        const userNameInput: string = req.body.userName;
        const passwordInput: string = req.body.password;

        const fetchedUser: IUser | MongoError = await User.getUserByUsername(userNameInput);

        if ((fetchedUser instanceof MongoError) || (!fetchedUser && (typeof(fetchedUser)) === 'undefined')) {
            return UserController.resolveResponse(res, fetchedUser);
        }

        const isMatched: boolean = await bcrypt.compare(passwordInput, fetchedUser.password);

        if (!isMatched) return UserController.resolveErrorResponse(res, 'Password do not match', 403);

        const payload = {user: fetchedUser};
        const token: string = jwt.sign(payload, coreConfig.secretKey, {expiresIn: 1800});

        if (!token) return UserController.resolveErrorResponse(res, 'Error signing payload', 500);

        fetchedUser.lastVisted = moment().toDate();
        try {
            const result = await fetchedUser.save();
            return res.status(res.statusCode).json({
                status: res.statusCode,
                authToken: `JWT ${token}`,
                result: {
                    _id: result._id,
                    userName: result.userName,
                    fullName: result.fullName,
                    createdOn: result.createdOn,
                    updatedOn: result.updatedOn,
                    lastVisted: result.lastVisted,
                    todos: result.todos
                }
            });
        } catch (error) {
            return UserController.resolveResponse(res, error);
        }
    }
}
