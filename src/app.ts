import express from 'express';
import http from 'http';
import getApolloServer from './graphql/index'
import {port} from './config/environment';
import getDBConnection from './config/db';
import { roleService } from "./services/user/roleService";
import {authMiddleWare} from "./config/auth/auth";

const app = express();

app.use(authMiddleWare)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next()
});


(async () => {
    try {
        await getDBConnection()
        await roleService.createRoles()
        console.log("DB connection successful");
        const httpServer = await http.createServer(app);
        const apolloServer = await getApolloServer(httpServer);
        await apolloServer.start();
        app.use(apolloServer.getMiddleware())
        await new Promise<void>(resolve => httpServer.listen({port: port}, resolve));
        console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    } catch (err) {
        console.error("Error starting server with result", err)
    }
})();








