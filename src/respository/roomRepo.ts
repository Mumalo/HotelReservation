import {IRoom, Room} from "../models";
import {HydratedDocument} from "mongoose";
import {CrudRepository} from "./crudRepo";
import {ReadRepository} from "./readRepo";

export abstract class RoomRepository implements CrudRepository<IRoom, String>, ReadRepository<String> {
    async delete(id: String): Promise<boolean> {
        throw new Error("Method Not implemented")
    }

    public async findById(roomId: String): Promise<any> {
        return Room.findById(roomId);
    }

    public async save(roomProps: IRoom): Promise<HydratedDocument<IRoom>> {
        try {
            const session = await Room.startSession();
            return new Promise((resolve, reject) => {
                try {
                    session.withTransaction(async () => {
                        const instance: HydratedDocument<IRoom> = new Room(roomProps)
                        const saved: HydratedDocument<IRoom> = await instance.save({session: session});
                        return resolve(saved)
                    });
                } catch(err){
                    reject(err)
                }
            })

        } catch (err) {
            console.error("Error saving room")
            throw err
        }
    }

    public async exists(roomId: String): Promise<boolean> {
        try {
            const room = await this.findById(roomId)
            console.log(`Found room us ${room}`)
            return !!room;
        } catch (err) {
            console.error("exists >> error", err)
            return false
        }
    }
}
