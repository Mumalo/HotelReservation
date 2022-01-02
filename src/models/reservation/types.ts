import {Types} from "mongoose";
import {RoomType} from "..";

type ReservedRoom = {
    _id: Types.ObjectId | string
    roomPrice: Number
    roomType: RoomType
}

export interface IReservation {
    room: ReservedRoom
    user: Types.ObjectId | string
    checkin: Date
    checkout: Date
}

export interface MakeReservationInput {
    roomId: string
    userId: string
    checkin: string
    checkout: string
}
