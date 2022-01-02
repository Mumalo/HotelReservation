import {join} from 'path';
import {readdirSync, readFileSync} from 'fs';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {resolvers} from './resolvers'; // We imported this

const gqlFiles = readdirSync(join(__dirname, './typedefs'));
let typeDefs = '';

gqlFiles.forEach((file: string) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), {
        encoding: 'utf8',
    });
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers, // We added this
});

export default schema;

