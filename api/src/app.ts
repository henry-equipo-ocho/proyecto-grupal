import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index';

// Initialization
const server = express();

server.set('port', process.env.PORT || 3001);

server.use(morgan('dev'));
server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`API is at http://localhost:${server.get('port')}`);
});

server.use('/', routes);

export default server;