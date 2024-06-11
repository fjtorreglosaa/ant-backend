import 'dotenv/config';
import * as env from 'env-var';

export const envs = {

    PORT: env.get('PORT').required().asPortNumber(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').asString(),

    JWT_SEED: env.get('JWT_SEED').required().asString(),

    // // SQL Server Database Setup
    // SQL_SERVER_DB_USER: env.get('SQL_SERVER_DATABASE_USER').required().asString(),
    // SQL_SERVER_DB_PASS: env.get('SQL_SERVER_DATABASE_PASS').required().asString(),
    // SQL_SERVER_DB_URL:  env.get('SQL_SERVER_DATABASE_URL').required().asString()

}