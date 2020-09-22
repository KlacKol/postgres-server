import {Router} from 'express';
import multer from 'multer';

import {MulterOptions} from "../../../middlewares/multer";
import {addUser} from "../../../services/auth.service";
import {ValidateUser} from "../../../middlewares/Validator";
import errorHandler from "../../../utils/errorHandler";

const router = Router();
const upload = multer(MulterOptions).single('avatar')

router.post("/registration", upload, ValidateUser, async (req,res) => {
    try {
        const data = await addUser(req, res);
        return res.status(201).json(data);
    } catch (e) {
        console.log(e);
        errorHandler(res, 'error registration', e);
    }
});

export default router