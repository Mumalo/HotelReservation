import {CrudRepository} from "./crudRepo";
import {ReadRepository} from "./readRepo";
import {IRole, Role} from "../models";
import {HydratedDocument} from "mongoose";


export abstract class RoleRepository implements CrudRepository<IRole, String>, ReadRepository<String> {
    public async delete(item: String): Promise<boolean> {
        throw new Error("Action does not exist");
    }

    public async exists(id: String): Promise<boolean> {
        try {
            const room = this.findById(id);
            return !!room;
        } catch (err) {
            console.error("reservation >> error", err)
            return false
        }
    }

    public async findById(id: String): Promise<any> {
        return Role.findOne({id: id});
    }

    public async save(item: IRole): Promise<IRole> {
        try {
            const session = await Role.startSession();
            return new Promise((resolve, reject) => {
                session.withTransaction(async () => {
                    try {
                        const instance: HydratedDocument<IRole> = new Role(item)
                        const saved: HydratedDocument<IRole> = await instance.save({session: session});
                        if (!saved) reject('Error saving reservation')
                        return resolve(saved)
                    } catch (err) {
                        reject(err)
                    }
                });
            })
        } catch (err) {
            console.error("Error saving reservation")
            throw err
        }
    }

}
