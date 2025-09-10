import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('.env') });

const {
  DATABASE_URL,
  REDIS_HOST,
  REDIS_PORT,
  CLOUDFLARE_API_KEY,
  R2_ENDPOINT,
  R2_ACCESS_KEY_ID,
  R2_ACCESS_KEY_SECRET,
  R2_READ_ENDPOINT,
} = process.env;

export default abstract class Constants {
  static databaseUrl = DATABASE_URL;
  static cloudflareApiKey = CLOUDFLARE_API_KEY;
  static r2Endpoint = R2_ENDPOINT;
  static r2AccessKeyId = R2_ACCESS_KEY_ID;
  static r2AccessKeySecret = R2_ACCESS_KEY_SECRET;
  static r2ReadEndpoint = R2_READ_ENDPOINT;
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
