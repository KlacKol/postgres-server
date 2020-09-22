import {UserSchema} from "../models/User";

export const userGetAll = async () => {
    return UserSchema.findAll({
        attributes: ['email', 'name', 'isAdmin', 'id', 'avatar']
    });
};

export const userDeleteOne = async (id) => {
    console.log(id)
    return UserSchema.destroy({
        where: {
            id
        }
    });
};