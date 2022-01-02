import {IReservation, IRoom, MakeReservationInput} from "../../../models";
import {reservationService, roomService, userService} from "../../../services";
import {HydratedDocument} from "mongoose";
import {toReservationPersistence} from "../../../config/mappers";
import {allRolesAuthFilter} from "../../../config/auth/auth";

export const reservationMutations = {
    reserveRoom: async (_: any, args: any, req: any): Promise<IReservation> => {
        allRolesAuthFilter(req);
        const {reservationInput} = args as { reservationInput: MakeReservationInput }
        const roomId = reservationInput.roomId
        const userId = reservationInput.userId
        const exists = await roomService.exists(roomId)
        if (!exists) {
            throw new Error(`Room with id ${roomId} does not exist`);
        }

        const userExists = await userService.exists(userId);

        if (!userExists) {
            throw new Error(`User with id ${userId} does not exist`);
        }

        const room: IRoom = await roomService.findById(roomId)

        if (!room.isFree) {
            throw new Error(`Room with id ${roomId} is not free for the given time range`);
        }

        if (reservationInput.checkin > reservationInput.checkout) {
            throw new Error(`Invalid date range...`);
        }

        const reservationToSave: IReservation = toReservationPersistence(reservationInput, room)
        const result: HydratedDocument<IReservation> = await reservationService.save(reservationToSave)
        room.isFree = false
        await roomService.save(room)
        return result
    }

}
