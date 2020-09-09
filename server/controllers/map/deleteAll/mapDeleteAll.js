import {Router} from 'express';
import {mapDeleteAll} from "../../../services/map.service";
import errorHandler from "../../../utils/errorHandler";
import passport from "passport";
const router = Router();

router.delete("/delete/all", passport.authenticate('jwt', {session: false}), async (req,res) => {
    try {
        await mapDeleteAll();
        return res.status(204).end();
    } catch (e) {
        errorHandler(res, 'error delete all: ', e);
    }
});

export default router