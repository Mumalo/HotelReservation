import {RoleRepository} from "../../respository/roleRepo";
import {IRoleService} from "./types";
import {Authority, IRole, Role} from "../../models";
import {rolesData} from "../../config/seeders/roles";

export class RoleService extends RoleRepository implements IRoleService {
    async execQuery(page: number, filter: any): Promise<Array<IRole>> {
        try {
            if (!page) page = 1;
            const perPage: number = 10;
            return Role.find(filter)
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
        } catch (err) {
            console.error("Error finding free rooms", err);
            return [];
        }
    }

    async findAll(page: number): Promise<Array<IRole>> {
        try {
            if (!page) page = 1;

            const perPage: number = 10;

            const roles: any = Role.find()
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
            console.log(`Found ${roles.length} roles`);
            return roles
        } catch (err) {
            console.error("Error finding rooms", err)
            return []
        }
    }

     async createRoles(): Promise<void> {
        for (const role of rolesData){
           try {
               const roleExist =  await this.findByAuthority(role);
               console.log(`Existing role is ${roleExist}`)
               if (!roleExist){
                   console.log(`Saving new role ${role}`)
                   await this.save(role)
                   console.log("Role saved successfully")
               }
           } catch (err){}
        }
    }

    async findByAuthority(role: { authority: string}): Promise<any | null> {
        try {
            return await Role.findOne({authority: role.authority}).exec()
        } catch (err){
            console.error("Error finding role", err)
            return null
        }
    }
}

const instance = new RoleService();
export { instance as roleService }
