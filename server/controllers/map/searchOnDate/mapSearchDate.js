import {Router} from 'express';
import {mapGetFilterDate} from "../../../services/map.service";
import passport from "passport";
const router = Router();
import {io} from '../../../../index';


router.post("/search", passport.authenticate('jwt', {session: false}),  async (req,res) => {
    try {
        io.once('connect', (socket) => {
            console.log("New client connected" + socket.id);
            socket.on('param', async (param) => {
                const data = await mapGetFilterDate(param);
                io.sockets.emit('get_data', data);
            })
        })
        return res.status(200)
    } catch (e) {
        res.status(404).json({message: `error get search date: ${e}`});
    }
});

export default router