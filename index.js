import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import passport from 'passport';
import redis from 'redis';
import config from 'config';

import swaggerDocument from './swagger';
import useControllers from './server/routes';
import cors from 'cors';
import {db} from "./config/database";

const PORT = config.get('port') || 5000;
const HOST = config.get('host') || '0.0.0.0';
const app = express();

export const clientRedis = redis.createClient({
    port: 6379,
    host: 'redis'
});


app.use(passport.initialize());
require('./server/middlewares/passport')(passport);
app.use(bodyParser({extended: true}));
app.use(cors());
useControllers(app);

async function start() {
    try {
        clientRedis.on("connect", () => {
            console.error('Redis client success connected');
        });
        clientRedis.on("error", function(error) {
            console.error(error);
        });
        db.authenticate()
            .then(() => 'connected')
            .catch(e=> console.log(e));
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen(PORT, HOST,() => {
            console.log('START ' + HOST + ':' + PORT)
        })
    } catch (e) {
        console.log('Server error',  e.message);
        process.exit(1);
    }
}

start();
