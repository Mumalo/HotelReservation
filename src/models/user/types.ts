import {Types} from "mongoose";

export const enum Authority {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER",
}

export interface IRole {
    authority: Authority
}

export type IUser = {
    firstname: String
    lastname: String
    email: String,
    password: String,
    roles: Array<{_id: Types.ObjectId, authority: String}> | []
}

export interface CreateUserInput {
    email: string
    firstname: string
    lastname: string
    password: string
    roles: [Authority] | []
}

export type AuthData = {
    token: string,
    userId: string,
    roles: string[]
}


