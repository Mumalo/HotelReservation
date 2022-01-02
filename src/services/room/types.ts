import {IService} from "../service";
import {IRoom} from "../../models";

export interface IRoomService extends IService<IRoom, String> {
    findAll(page: number): Promise<Array<IRoom>>

    currentFreeRooms(page?: number): Promise<Array<IRoom>>
}
