import {CrudRepository} from "./crudRepo";
import {HydratedDocument} from "mongoose";
import {IUser, User} from "../models";
import {ReadRepository} from "./readRepo";

export abstract class UserRepository implements CrudRepository<IUser, String>, ReadRepository<String> {
    delete(id: String): Promise<boolean> {
        throw new Error("Delete not implemented");
    }

    public async save(userProps: IUser): Promise<HydratedDocument<IUser>> {
        const session = await User.startSession();
        return new Promise((resolve, reject) => {
            session.withTransaction(async () => {
               try {
                   const instance: HydratedDocument<IUser> = new User(userProps)
                   const saved: HydratedDocument<IUser> = await instance.save({session: session});
                   return resolve(saved)
               } catch(err){
                   reject(err)
               }
            });
        })
    }

    async exists(id: String): Promise<boolean> {
        return !!await this.findById(id);
    }

    async findById(id: String): Promise<any> {
        return User.findById(id).exec()
    }

    async findByEmail(email: string): Promise<any |null> {
        try {
            return await User.findOne({ email: email }).exec()
        } catch(err){
            console.error("Error finding user", err);
            return null;
        }
    }
}
