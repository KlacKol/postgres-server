import {Router} from 'express';
import multer, {diskStorage} from 'multer';

import {MulterOptions} from "../../../middlewares/multer";
import {addUser} from "../../../services/auth.service";
import {ValidateUser} from "../../../middlewares/Validator";
import errorHandler from "../../../utils/errorHandler";

const storage = diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const timestamp = new Date().getTime().toString();
        cb(null, `${timestamp}.png`);
    },
});
const router = Router();
const upload = multer({storage}).single('avatar')

router.post("/registration", upload, ValidateUser, async (req,res) => {
    try {
        const data = await addUser(req, res);
        return res.status(201).json(data);
    } catch (e) {
        errorHandler(res, 'error registration', e);
    }
});

export default router