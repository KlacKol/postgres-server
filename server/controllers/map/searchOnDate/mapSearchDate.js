import {Router} from 'express';
import passport from "passport";

import {mapGetFilterDate} from "../../../services/map.service";
import {io} from '../../../../index';
import {ValidateFilterMap} from "../../../middlewares/Validator";

const router = Router();

router.post("/search", passport.authenticate('jwt', {session: false}), ValidateFilterMap,  async (req,res) => {
    try {
        const data = await  mapGetFilterDate(req.body)
        // io.once('connect', (socket) => {
        //     console.log("New client connected" + socket.id);
        //     socket.on('param', async (param) => {
        //         const data = await mapGetFilterDate(param);
        //         socket.emit('get_data', data);
        //     })
        // })
        return res.status(200).json(data);
    } catch (e) {
        res.status(404).json({message: `error get search date: ${e}`});
    }
});

export default router