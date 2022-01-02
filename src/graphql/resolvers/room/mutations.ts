import {CreateRoomInput, IRoom, UpdateRoomInput} from "../../../models";
import {roomService} from "../../../services";
import {HydratedDocument} from "mongoose";
import {toRoomPersistence} from "../../../config/mappers";
import {bindData} from "../../../config/utils";
import {adminAuthFilter, allRolesAuthFilter} from "../../../config/auth/auth";

const roomMutations = {
    addRoom: async (_: any, args: any, req: any): Promise<any> => {
        allRolesAuthFilter(req);
        const {roomInput} = args as { roomInput: CreateRoomInput }
        const persistence: IRoom = toRoomPersistence(roomInput);
        const room: HydratedDocument<IRoom> = await roomService.save(persistence)
        console.log(`Rom with id ${room} saved successfully`)
        return room
    },

    updateRoom: async (_: any, args: any, req: any): Promise<any> => {
        adminAuthFilter(req);
        const {roomInput, id} = args as { roomInput: Partial<CreateRoomInput>, id: String }
        const existingRoom: IRoom = await roomService.findById(id);
        if (!existingRoom) {
            throw new Error(`Room with id ${id} does not exist`);
        }
        bindData(roomInput, existingRoom)
        const room: IRoom = await roomService.save(existingRoom);
        console.log(`Rom with id ${id} updated successfully`)
        return room
    }
}

export default roomMutations;
