import {IService} from "../service";
import { IRole, IUser } from "../../models";

/**
 * Some methods here should probably go to the repository
 * but this is here just to demonstrate programming to an interface
 */
export interface IUserService extends IService<IUser, String> {
    findAll(page: number): Promise<Array<IUser>>

    execQuery(page: number, filter: any): Promise<Array<IUser>>
}

export interface IRoleService extends IService<IRole, String> {
    findAll(page: number): Promise<Array<IRole>>

    execQuery(page: number, filter: any): Promise<Array<IRole>>

    createRoles(rolesArray: Array<IRole>): Promise<void>

    findByAuthority(roleId: { authority: string}): Promise<any | null>
}
