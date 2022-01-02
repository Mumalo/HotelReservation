import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {Server} from 'http';
import schema from "./schema";


async function createApolloServer(httpServer: Server): Promise<ApolloServer> {
    return new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
        context: ({ req }) => {
            const reqObj = req as any
            return {
                isAuthenticated: reqObj.isAuthenticated,
                ...reqObj.userDetails
            }
        }
    })
}


export default createApolloServer;
