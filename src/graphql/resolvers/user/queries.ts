import {userService} from "../../../services";
import {AuthData, IRole} from "../../../models";
import {keys} from "../../../config/environment";
import bcrypt from "bcryptjs";
import {AuthenticationError} from "apollo-server-errors";
import jwt from "jsonwebtoken";

export const userQueries = {
    users: async (_: any, args: any): Promise<any> => {
        const { page } = args as { page: number }
        return userService.findAll(page)
    },

    login: async (_:any, args: any ): Promise<AuthData> => {
        const secretKey = keys.JWT_SECRET as string;
        console.log(args)
        const { email, password } = args as { email: string, password: string};
        const user = await userService.findByEmail(email);
        if (!user){
            throw new Error(`User with email ${email} does not exist`);
        }

        const hashedPassword = user.password;
        const passwordsEqual = await bcrypt.compare(password, hashedPassword);

        if (!passwordsEqual){
            throw new AuthenticationError('Username or password does not match');
        }

        const roles: string[] = user && user.roles.map((r: IRole) => {
            return r.authority
        });

        console.log(roles)

        const payload = {
            userId: user._id.toString(),
            email:  user.email,
            roles: roles
        }
        const token = jwt.sign(payload, secretKey);

        return {
            ...payload,
            token: token
        }
    }
}
