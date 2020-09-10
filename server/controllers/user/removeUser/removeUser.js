import {Router} from 'express';
import errorHandler from "../../../utils/errorHandler";
import passport from "passport";
import {userDeleteOne} from "../../../services/user.service";
const router = Router();

router.delete("/users/:email", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const success = await userDeleteOne(req.params.email);
        if (success) {
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (e) {
        errorHandler(res, 'error delete-email: ', e);
    }
});

export default router