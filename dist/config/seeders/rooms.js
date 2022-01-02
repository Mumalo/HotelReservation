"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsData = void 0;
const uuid_1 = require("uuid");
/*
/*
_id: ID!
    roomPrice: Float!
    isFree: Boolean
    createdAt: Date!
    updatedAt: Date!
}
 */
exports.roomsData = [
    {
        _id: (0, uuid_1.v4)(),
        roomPrice: 234.89,
        isFree: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: (0, uuid_1.v4)(),
        roomPrice: 345.89,
        isFree: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: (0, uuid_1.v4)(),
        roomPrice: 234.89,
        isFree: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
