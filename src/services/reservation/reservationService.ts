import {ReservationRepository} from "../../respository";
import {IReservation, Reservation} from "../../models";
import {IReservationService} from "./types";
import {FilterQuery} from "mongoose";
import moment from "moment";

export class ReservationService extends ReservationRepository implements IReservationService {
    private static async execQuery(filter: FilterQuery<IReservation>, page?: number): Promise<Array<IReservation>> {
        try {
            if (!page) page = 1;
            const perPage: number = 10;
            return Reservation.find(filter)
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
        } catch (err) {
            console.error("Error finding free rooms", err);
            return [];
        }
    }

    public async findAll(page: number): Promise<Array<IReservation>> {
        try {
            if (!page) page = 1;

            const perPage: number = 10;

            const reservations: any = Reservation.find()
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
            console.log(`Found ${reservations.length} reservations`);
            return reservations
        } catch (err) {
            console.error("Error finding rooms", err)
            return []
        }
    }


    public async getNonConflictingReservationsBetween(start: Date, end: Date): Promise<Array<IReservation>> {
        console.log(new Date(start))
        try {
            const beforeReservations: Array<IReservation> = await ReservationService.execQuery({
                checkin: {
                    $gte: end
                }
            })

            const afterReservations: Array<IReservation> = await ReservationService.execQuery({
                checkout: {
                    $lte: start
                }
            })

            return [...beforeReservations, ...afterReservations]
        } catch (err){
            console.error("Error getNonConflictingReservationsBetween ", err)
            return []
        }
    }

    public async getUserReservations(userId: string, page?: number): Promise<Array<IReservation>> {
        const queryFilter = {
            user: userId
        }
        return ReservationService.execQuery(queryFilter, page);
    }
}

const instance = new ReservationService()

export {instance as reservationService}
