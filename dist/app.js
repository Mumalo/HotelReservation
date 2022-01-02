"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./graphql/index"));
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
//register middlewares here
app.use((req, res, next) => {
    console.log("Just a test middle ware");
});
/**
 * async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    const httpServer = http_1.default.createServer(app);
    const apolloServer = yield (0, index_1.default)(httpServer);
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    yield new Promise(resolve => httpServer.listen({ port: environment_1.port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${environment_1.port}${apolloServer.graphqlPath}`);
}))();
