import {Router} from 'express';
import {mapDeleteAll} from "../../services/map.service";
import errorHandler from "../../utils/errorHandler";
import passport from "passport";
const router = Router();

router.delete("/delete/all", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        const success = await mapDeleteAll();
        if (success) {
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (e) {
        errorHandler(res, 'error delete all: ', e);
    }
});

export default router