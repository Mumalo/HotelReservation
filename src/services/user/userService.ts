import {UserRepository} from "../../respository";
import {IUserService} from "./types";
import {IUser, Reservation, User} from "../../models";

export class UserService extends UserRepository implements IUserService {
    async execQuery(page: number, filter: any): Promise<Array<IUser>> {
        try {
            if (!page) page = 1;
            const perPage: number = 10;
            return User.find(filter)
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
        } catch (err) {
            console.error("Error finding free rooms", err);
            return [];
        }
    }

    async findAll(page: number): Promise<Array<IUser>> {
        try {
            if (!page) page = 1;

            const perPage: number = 10;

            const rooms: any = Reservation.find()
                .sort({createdAt: -1})
                .skip((page - 1) * perPage)
                .limit(perPage)
            console.log(`Found ${rooms.length} rooms`);
            return rooms
        } catch (err) {
            console.error("Error finding rooms", err)
            return []
        }
    }

}

const instance = new UserService();

export {instance as userService}
