const environmentHosting = process.env.NODE_ENV || 'Development';
const MONGO_USERNAME = 'jaanartc';
const MONGO_PASSWORD = 'myPassword';

export const coreConfig = {
  mongoURI: environmentHosting === 'Development' ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ds131697.mlab.com:31697/jaanartc` : process.env.MONGODB_URI,
  secretKey: environmentHosting === 'Development' ? 'mySuperSecret' : process.env.SECRET_KEY
}