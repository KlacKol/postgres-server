import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import passport from 'passport';
import redis from 'redis';
import config from 'config';
import cors from 'cors';

import swaggerDocument from './swagger';
import useControllers from './server/routes';
import {db} from "./config/database";

const PORT = config.get('port') || 5000;
const HOST = config.get('host') || '0.0.0.0';
const app = express();

const redisHost = process.env.NODE_ENV ? '0.0.0.0' : 'redis';

export const clientRedis = redis.createClient({
    port: 6379,
    host: redisHost
});


app.use(passport.initialize());
require('./server/middlewares/passport')(passport);
app.use(bodyParser({extended: true}));
app.use(cors());
useControllers(app);

async function start() {
    try {
        clientRedis.on("connect", () => {
            console.log('Redis client success connected');
        });
        clientRedis.on("error", (error) => {
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

module.exports.app = app;