import {Model, model, Schema} from 'mongoose';
import {IRoom, RoomType} from "./types";

const roomSchema = new Schema<IRoom>({
        roomPrice: {
            type: Number,
            required: true,
        },

        isFree: {
            type: Boolean,
            required: false,
            default: false
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
    {
        timestamps: true
    }
)

export const Room: Model<IRoom> = model<IRoom>('Room', roomSchema);
