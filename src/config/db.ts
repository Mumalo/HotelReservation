import {connect, Mongoose} from 'mongoose';
import {env} from "./environment";

const CONNECTION_STRING = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.8iqum.mongodb.net/${env.DB_NAME}`


const getConnection = async (): Promise<Mongoose> => {
    return await connect(CONNECTION_STRING);
}

export default getConnection;
