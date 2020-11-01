import * as dotenv from "dotenv";

dotenv.config();
let path;
console.log('directorio raíz de los ambientes', __dirname, process.env.NODE_ENV + "--");
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/environments/test.env`;
    break;
  case "production":
    path = `${__dirname}/environments/prod.env`;
    break;
  default:
    path = `${__dirname}/environments/dev.env`;
}
dotenv.config({ path: path });

export default {
  /**
   * ID de la aplicación
   */
  environment: process.env.ENVIRONMENT || 'production',
  database: {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_HOST || '',
    database: process.env.DB_DATABASE || '',
    port: Number.parseInt(process.env.DB_PORT || '') || 0
  },
}