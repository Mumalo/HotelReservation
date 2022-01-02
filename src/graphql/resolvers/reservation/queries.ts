import {reservationService} from "../../../services";
import {adminAuthFilter, allRolesAuthFilter} from "../../../config/auth/auth";

export const reservationQueries = {
    userReservations: async (_: any, args: any, req: any) => {
        allRolesAuthFilter(req);
        const {userId, page} = args as { userId: string, page: number }
        return reservationService.getUserReservations(userId, page);
    },

    listReservations: async (_: any, args: any, req: any) => {
        adminAuthFilter(req);
        const {page} = args as { page: number }
        return reservationService.findAll(page);
    },
}
