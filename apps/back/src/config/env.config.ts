// import 'dotenv/config';

export class EnvConfig {
  static PORT = process.env['PORT'];

  static DB_NAME = process.env['DB_NAME'];
  static DB_HOST = process.env['DB_HOST'];
  static DB_USERNAME = process.env['DB_USERNAME'];
  static DB_PASSWORD = process.env['DB_PASSWORD'];
  static DB_PORT = +process.env['DB_PORT'];

  static JWT_SECRET = process.env['JWT_SECRET'];
}
