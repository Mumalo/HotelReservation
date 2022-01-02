import {IRoom} from "../../../models";
import {roomService} from "../../../services";
import {adminAuthFilter} from "../../../config/auth/auth";

const roomQueries = {
    rooms: async (_: any, args: any, req: any): Promise<Array<IRoom>> => {
        adminAuthFilter(req);
        const {page} = args as { page: number }
        return await roomService.findAll(page)
    },

    freeRooms: async (_: any, args: any) => {
        const { roomQuery } = args
        const startDate: Date = new Date(roomQuery.checkin)
        const endDate: Date = new Date(roomQuery.checkout)

        if (startDate > endDate){
            return new Error('Invalid date range');
        }
        return roomService.freeRooms(startDate, endDate)
    }

}


export default roomQueries
