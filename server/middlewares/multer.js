import { diskStorage } from 'multer';

export const MulterOptions = {
    limits: {
        fileSize: 10000000000000,
    },
    fileFilter: (req, file, cb) => {
        console.log(file, 'multer');
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    storage: diskStorage({
        destination(req, file, cb) {
            cb(null, '/uploads');
        },
        filename(req, file, cb) {
            console.log(file);
            const timestamp = new Date().getTime().toString();
            cb(null, `${timestamp}.png`);
        },
    }),
};
