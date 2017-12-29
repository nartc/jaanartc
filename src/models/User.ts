import { Schema, model, Model, Document } from 'mongoose';
import { MongoError } from 'mongodb';

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  fullName: String,
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  lastVisited: Date,
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

export interface IUser extends Document {
  userName?: string,
  fullName?: string,
  password?: string,
  createdOn?: Date,
  updatedOn?: Date,
  lastVisted?: Date,
  todos?: string[]
}

export interface IUserModel extends Model<IUser> {
  createUser(newUser: IUser);
  getUserByUsername(userName: string);
  getUserById(id: string);
  updateUser(id: string, updatedUser: IUser);
}

// User Functions
UserSchema.static('createUser', (newUser: IUser) => {
  return User.create(newUser)
    .then((result: IUser) => result)
    .catch((error: MongoError) => error);
});

UserSchema.static('getUserByUsername', (userName: string) => {
  const query = { userName };
  return User.findOne(query).select('-__v')
    .then((result: IUser) => result)
    .catch((error: MongoError) => error);
});

UserSchema.static('getUserById', (id: string) => {
  return User.findById(id).select('-__v')
    .then((result: IUser) => result)
    .catch((error: MongoError) => error);
});

UserSchema.static('updateUser', (id: string, updatedUser: IUser) => {
  return User.findByIdAndUpdate(id, updatedUser, {new: true})
    .then((result: IUser) => result)
    .catch((error: MongoError) => error);
});

export const User = model<IUser>('User', UserSchema) as IUserModel;
