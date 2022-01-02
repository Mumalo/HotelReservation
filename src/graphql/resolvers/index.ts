import {roomMutations, roomQueries} from "./room";
import {userMutations, userQueries} from "./user";
import {reservationMutations, reservationQueries} from "./reservation";

export const resolvers = {
    Query: {
        ...roomQueries,
        ...userQueries,
        ...reservationQueries
    },

    Mutation: {
        ...roomMutations,
        ...userMutations,
        ...reservationMutations
    }
}
