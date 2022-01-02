import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT;

export const env = {
    development: process.env.NODE_ENV === 'development',
    test: process.env.NODE_ENV === 'test',
    staging: process.env.NODE_ENV === 'staging',
    production: process.env.NODE_ENV === 'production',
    DB_USER: process.env.MONGO_USER,
    DB_NAME: process.env.MONGO_DATABASE,
    DB_PASSWORD: process.env.MONGO_PASSWORD,
}

export const keys  = {
    JWT_SECRET: process.env.JWT_SECRET
}
