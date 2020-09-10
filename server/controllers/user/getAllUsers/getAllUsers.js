import {Router} from 'express';
import passport from 'passport';

import {userGetAll} from "../../../services/user.service";

const router = Router();

router.get("/users", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const users = await userGetAll();
        return res.status(200).json(users);
    } catch (e) {
        res.status(404).json({message: `error get all: ${e}`});
    }
});

export default router