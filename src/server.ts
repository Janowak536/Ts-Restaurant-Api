import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import restauracjaRoutes from './routes/Restauracja';
import pracownikRoutes from './routes/Pracownik';

const router = express();

/**Connect to Mongo */

mongoose.connect(config.mongo.url, {retryWrites:true,w:'majority'})
.then(()=>{
    Logging.info('Connected to mongoDB.');
    StartServer();
})
.catch((error)=>{
    Logging.error('Unable to connect: ');
    Logging.error(error);
});

/**if mongo connect start server */
const StartServer=()=>{
    router.use((req,res,next)=>{
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish',()=>{
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP:[${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** ROUTES */
    router.use('/restauracje',restauracjaRoutes);
    router.use('/pracownicy',pracownikRoutes);
    /**PING */
    router.get('/ping',(req,res,next)=>res.status(200).json({message:'pong'}));

    /**ERROR HANDLING */
    router.use((req,res,next)=>{
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({message: error.message});
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

};