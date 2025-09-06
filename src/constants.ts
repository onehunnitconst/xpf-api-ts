import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('.env') });

const { DATABASE_URL, REDIS_HOST, REDIS_PORT } = process.env;

export default abstract class Constants {
  static databaseUrl = DATABASE_URL;
  static redisHost = REDIS_HOST;
  static redisPort = REDIS_PORT;
  static jwtPrivateKeyPath = path.join(
    __dirname,
    '..',
    'keys/jwt_private_key.key',
  );
  static jwtPublicKeyPath = path.join(
    __dirname,
    '..',
    'keys/jwt_public_key.pem',
  );
}
