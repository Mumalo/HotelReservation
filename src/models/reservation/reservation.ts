import {Model, model, Schema, Types} from 'mongoose';
import {IReservation} from "./types";
import {RoomType} from "..";

const reservationSchema = new Schema<IReservation>({
    room: {
        _id: {
            type: Types.ObjectId,
            required: true,
            ref: 'Room'
        },
        roomPrice: {
            type: Number,
            required: true
        },

        roomType: {
            type: String,
            enum: {
                values: [RoomType.SINGLE, RoomType.DOUBLE, RoomType.PREMIUM],
                message: '{VALUE} not supported'
            },
            default: RoomType.SINGLE
        }
    },

    user: {
        type: Types.ObjectId,
        ref: 'User'
    },

    checkin: {
        type: Date,
        validate: {
            validator: function (date: Date) {
                console.log(`Date is ${date}`)
                return date > new Date()
            },
            message: props => `${props.value} cannot be in the past!`
        },
        required: true
    },

    checkout: {
        type: Date,
        validate: {
            validator: function (date: Date) {
                return date > new Date()
            },
            message: props => `${props.value} cannot be in the past!`
        },
        required: true
    }

}, {
    timestamps: true
})

export const Reservation: Model<IReservation> = model<IReservation>('Reservation', reservationSchema);

