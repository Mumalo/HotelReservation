import {model, Model, Schema} from 'mongoose';
import {Authority, IRole, IUser} from "./types";

const validateEmail = (email: string): boolean => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema<IUser>({
    firstname: {
        type: String,
        required: false
    },

    lastname: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'User email must be valid'],
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    roles: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Role'
            },
            authority: String
        }
    ]
}, {
    timestamps: true
});


const roleSchema = new Schema<IRole>({
    authority: {
        type: String,
        required: true,
        enum: [Authority.ADMIN, Authority.USER]
    }
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
export const Role: Model<IRole> = model<IRole>('Role', roleSchema);



