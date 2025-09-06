import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('.env') });

const { DATABASE_URL } = process.env;

export default abstract class Constants {
  static databaseUrl = DATABASE_URL;
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
