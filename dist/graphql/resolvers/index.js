"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const rooms_1 = require("../../config/seeders/rooms");
const room_1 = require("./room");
exports.resolvers = {
    Query: Object.assign({}, rooms_1.roomsData),
    Mutation: Object.assign({}, room_1.roomMutations)
};
