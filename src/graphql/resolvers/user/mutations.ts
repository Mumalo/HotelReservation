import {AuthData, CreateUserInput, IRole, IUser} from "../../../models";
import {userService} from "../../../services/user/userService";
import {bindData} from "../../../config/utils";
import {toUserPersistence} from "../../../config/mappers";
import {allRolesAuthFilter, verifyUserIdentity} from "../../../config/auth/auth";
import jwt from 'jsonwebtoken';
import { keys } from "../../../config/environment";
import bcrypt from 'bcryptjs'
import {AuthenticationError} from "apollo-server-errors";

/*
  All conversion from DTO to persistence should occur in this layer.
 */
export const userMutations = {
    signUp: async (_: any, args: any): Promise<any> => {
        const {userInput} = args as { userInput: CreateUserInput }
        const existingUser = await userService.findByEmail(userInput.email);

        if (existingUser){
            throw new Error(`User with email ${userInput.email} already exists`)
        }

        const userToSave: IUser = await toUserPersistence(userInput);
        console.log("User to save is ", userToSave)
        return await userService.save(userToSave)
    },

    updateUser: async (_: any, args: any, req: any): Promise<any> => {
        allRolesAuthFilter(req);
        const { userInput, id} = args as { userInput: Partial<CreateUserInput>, id: string }
        await verifyUserIdentity(req, id)
        const theUser: IUser = await userService.findById(id)

        if (!theUser) {
             throw new Error(`User with id ${id} does not exist`)
        }

        bindData(userInput, theUser);
        return await userService.save(theUser)
    }
}
