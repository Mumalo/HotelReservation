import {IReservation, IRoom, Reservation} from "../models";
import {HydratedDocument} from "mongoose";
import {CrudRepository} from "./crudRepo";
import {ReadRepository} from "./readRepo";

export abstract class ReservationRepository implements CrudRepository<IReservation, String>, ReadRepository<String> {
    async delete(id: String): Promise<boolean> {
        throw new Error("Method Not implemented")
    }

    public async findById(roomId: String): Promise<any> {
        return Reservation.findOne({id: roomId});
    }

    public async save(reservation: IReservation): Promise<HydratedDocument<IReservation>> {
        try {
            const session = await Reservation.startSession();
            return new Promise((resolve, reject) => {
                session.withTransaction(async () => {
                    try {
                        const instance: HydratedDocument<IReservation> = new Reservation(reservation)
                        const saved: HydratedDocument<IReservation> = await instance.save({session: session});
                        if (!saved) reject('Error saving reservation')
                        return resolve(saved)
                    } catch(err){
                        reject(err)
                    }
                });
            })
        } catch (err) {
            console.error("Error saving reservation")
            throw err
        }
    }

    public async exists(roomId: String): Promise<boolean> {
        try {
            const room = this.findById(roomId)
            return !!room;
        } catch (err) {
            console.error("reservation >> error", err)
            return false
        }
    }
}
