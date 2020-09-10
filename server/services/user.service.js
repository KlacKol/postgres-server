import {UserSchema} from "../models/User";

export const userGetAll = async () => {
    return UserSchema.findAll({
        attributes: ['email', 'name', 'isAdmin']
    });
};

export const userDeleteOne = async (email) => {
    console.log(email)
    return UserSchema.destroy({
        where: {
            email
        }
    });
};