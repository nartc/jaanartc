import { coreConfig } from './keys';
import { PassportStatic } from 'passport';
import { StrategyOptions, Strategy as JwtStrategy, ExtractJwt as ExtractJWT, VerifiedCallback} from 'passport-jwt';
import { IUser, User } from '../models/User';
import { MongoError } from 'mongodb';

export const authenticateUser = (passport: PassportStatic) => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: coreConfig.secretKey
  };

  passport.use(new JwtStrategy(options, async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
    const result = await User.getUserById(jwtPayload.user._id);

    if (result instanceof MongoError) return done(result, false);
    if (!result) {
      return done(null, false);
    } else {
      return done(null, result, { issuedAt: jwtPayload.iat })
    }
  }));
}

interface JwtPayload {
  user?: IUser,
  iat?: Date
}
