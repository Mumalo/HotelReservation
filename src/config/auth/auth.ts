import jwt  from 'jsonwebtoken'
import { keys } from "../environment";
import {AuthenticationError} from "apollo-server-errors";
import {Authority, IUser} from "../../models";
import {userService} from "../../services";

type TokenPayload = {
    userId: string,
    roles: Array<string>
}

export const authMiddleWare = async (req: any, res: any, next: any) => {
    console.log("Authenticating current request");
    const authHeader = req.headers.authorization || '';

    if (!authHeader){
        console.warn("Invalid authorization header");
        return rejectAuth(req, next);
    }

    const authToken = authHeader.split(' ')[1];

    if (!authToken){
        console.warn("No auth token provided");
        return rejectAuth(req, next)
    }

    const tokenPayload = await verifyClaims(authToken);


    if (!tokenPayload){
        console.warn("Token provided is not valid")
        return rejectAuth(req, next);
    }

    console.log("Valid token provided");
    return acceptAuth(req, tokenPayload, next);
}

const verifyClaims = async (authToken: string): Promise<TokenPayload | null> => {
    try {
        const secretKey = keys.JWT_SECRET as string
        const decodedToken = jwt.verify(authToken, secretKey) as TokenPayload
        return {
            userId: decodedToken.userId,
            roles: decodedToken.roles
        }
    } catch(err){
        console.error("Error verifying token", err);
        return null;
    }
}

const rejectAuth = (req: any, next: any) => {
    req.isAuthenticated = false;
    return next();
}

const acceptAuth = (req: any, tokenPayload: TokenPayload, next: any) => {
    req.isAuthenticated = true;
    req.userDetails = {
        userId: tokenPayload.userId,
        roles: tokenPayload.roles
    }
    return next();
}

const hasAdminRole = (roles: []): boolean => {
    return roles.some(authority => {
        console.log(authority == Authority.ADMIN)
        return authority == Authority.ADMIN
    });
}

const hasUserRole = (roles: []): boolean => {
    return roles.some(authority => authority == Authority.USER);
}

const extractRoles = (req: any) => {
    const roles = req.roles;
    if (!roles || roles.length == 0){
        throw new AuthenticationError("User must have a role in the system");
    }

    return roles
}
export const allRolesAuthFilter = (req: any): void => {
    if (!req.isAuthenticated){
        throw new AuthenticationError("User must be authenticated");
    }

    const roles = extractRoles(req);

    if (!hasUserRole(roles) && !hasAdminRole(roles)){
        //should be an authorization error
        throw new Error("User does snot have the privilege to access this ressource")
    }

    console.log("Successfully validated user permissions")
}

export const adminAuthFilter = (req: any): void => {
    if (!req.isAuthenticated){
        throw new AuthenticationError("User must be authenticated");
    }

    const roles = extractRoles(req);
    console.log(roles)

    if (!hasAdminRole(roles)){
        //should be an authorization error
        throw new Error("Admin privilege is required to access this route")
    }

    console.log("Successfully validated user permissions")
}

export const verifyUserIdentity = async (req: any, userId: string): Promise<void> => {
    const theUser: IUser = await userService.findById(userId);
    if (!theUser) {
        throw new Error(`User with id ${userId} does not exist`)
    }

    if (req.userId != userId){
        throw new Error("You cannot modify a resource you do not own");
    }
}


