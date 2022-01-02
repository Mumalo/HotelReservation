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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = __importDefault(require("./schema"));
// import
/*



app.listen(port, () => {
    console.log(`Started server on port ${port}`)
});


 */
// async function startApolloServer(typeDefs:any, resolvers:any){
//     const httpServer = http.createServer(app);
//
//     await server.start();
//     server.applyMiddleware({ app });
//     await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }
function createApolloServer(httpServer) {
    return __awaiter(this, void 0, void 0, function* () {
        return new apollo_server_express_1.ApolloServer({
            schema: schema_1.default,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
    });
}
exports.default = createApolloServer;
