"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomMutations = exports.roomQueries = void 0;
var queries_1 = require("./queries");
Object.defineProperty(exports, "roomQueries", { enumerable: true, get: function () { return __importDefault(queries_1).default; } });
var mutations_1 = require("./mutations");
Object.defineProperty(exports, "roomMutations", { enumerable: true, get: function () { return __importDefault(mutations_1).default; } });
