"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("./resolvers"); // We imported this
const gqlFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, './typedefs'));
let typeDefs = '';
gqlFiles.forEach((file) => {
    typeDefs += (0, fs_1.readFileSync)((0, path_1.join)(__dirname, './typedefs', file), {
        encoding: 'utf8',
    });
});
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: resolvers_1.resolvers, // We added this
});
exports.default = schema;
