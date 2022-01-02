export interface IRoom {
    roomPrice: Number
    isFree: Boolean
    roomType: RoomType
}

export type CreateRoomInput = {
    roomPrice: Number
    isFree: Boolean
    roomType: RoomType
}

export type UpdateRoomInput = {
    roomPrice: Number | null,
    isFree: Boolean | null
    roomType: RoomType | null
}

export const enum RoomType {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    PREMIUM = "PREMIUM",
}
