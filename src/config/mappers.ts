import {
    Authority,
    CreateRoomInput,
    CreateUserInput,
    IReservation,
    IRole,
    IRoom,
    IUser,
    MakeReservationInput
} from "../models";
import {roleService} from "../services/user/roleService";
import {ObjectId, Types} from "mongoose";
import bcrypt from "bcryptjs";

/*
  Graph ql types already define DTOs in some way
  So we dont necessarily need to define external mappers
 */
export const toReservationPersistence = (createInput: MakeReservationInput, room: IRoom): IReservation => {
    return {
        ...createInput,
        checkin: new Date(createInput.checkin),
        checkout: new Date(createInput.checkout),
        room: {
            _id: createInput.roomId,
            roomPrice: room.roomPrice,
            roomType: room.roomType
        },
        user: createInput.userId
    }
}

export const toRoomPersistence = (input: CreateRoomInput): IRoom => {
    return {
        ...input
    }
}

export const toUserPersistence = async (input: CreateUserInput): Promise<IUser> => {
    const roles: Array<{ _id: Types.ObjectId, authority: string}>  = []
    const authorities = input.roles
    console.log("UserRoles are ", authorities)
    if (authorities && authorities.length > 0){
        for (const authority of authorities){
            console.log("Current tole is ", authority)
            const foundRole = await roleService.findByAuthority({authority: authority});
            console.log("Found role is ", foundRole)
            roles.push(foundRole as { _id: Types.ObjectId, authority: Authority})
        }
    }
    const rawPassword = input.password as string
    const hashedPassword  = await bcrypt.hash(rawPassword, 12);
    return {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        roles: roles,
        password: hashedPassword
    }
}




