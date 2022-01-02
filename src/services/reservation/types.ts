import {IService} from "../service";
import {IReservation} from "../../models";

export interface IReservationService extends IService<IReservation, String> {
    findAll(page: number): Promise<Array<IReservation>>

    getNonConflictingReservationsBetween(checkin: Date, checkout: Date): Promise<Array<IReservation>>

    getUserReservations(userId: string, page?: number): Promise<Array<IReservation>>
}
