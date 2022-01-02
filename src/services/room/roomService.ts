import {RoomRepository} from "../../respository";
import {IReservation, IRoom, Room} from "../../models";
import {IRoomService} from "./types";
import {FilterQuery} from "mongoose";
import {reservationService} from "..";

class RoomService extends RoomRepository implements IRoomService {

    private static async execQuery(filter: FilterQuery<IRoom>, page?: number,): Promise<Array<IRoom>> {
        try {
            if (!page) page = 1;
            const perPage: number = 10;
            return Room.find(filter)
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
        } catch (err) {
            console.error("Error finding free rooms", err);
            return [];
        }

    }

    public async findAll(page: number): Promise<Array<IRoom>> {
        try {
            if (!page) page = 1;

            const perPage: number = 10;

            const rooms: any = Room.find()
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
            console.log(`Found ${rooms.length} rooms`);
            return rooms
        } catch (err) {
            console.error("Error finding rooms", err)
            return []
        }
    }

    public async currentFreeRooms(page?: number): Promise<Array<IRoom>> {
        const filterQuery = {isFree: true}
        return RoomService.execQuery(filterQuery, page)
    }

    /*
       A room is free is if has not been reserved or if the reservation
       will not conflict with the new one

       Algo for non conflicting reservation
       exitDate < currentReservationStart && currentReservationEnd < entry

       @TODO check how to handle pagination
     */
    public async freeRooms(checkin: Date, checkout: Date): Promise<Array<IRoom>> {
        const freeRooms: Array<IRoom> = await this.currentFreeRooms();

        if (freeRooms.length == 0 || freeRooms.length < 10) {
            console.warn("Searching for non conflicting-booked rooms");
            const nonConflictReservations: Array<IReservation> = await reservationService.getNonConflictingReservationsBetween(
                checkin,
                checkout
            )
            console.log(`${nonConflictReservations.length} rooms will be free by ${checkin} - ${checkout}`)
            const willBeFreeRooms: Array<IRoom> = nonConflictReservations.map(it => {
                return {
                    ...it.room,
                    isFree: false //they are not free now but they will be free
                }
            })
            freeRooms.push(...willBeFreeRooms);
        }

        return freeRooms
    }
}

const serviceInstance: RoomService = new RoomService()

export {serviceInstance as roomService}

