import server from './src/app';
import dotenv from 'dotenv';

dotenv.config();

server.listen(process.env.PORT || 3001, () => {
    console.log('Server listening at 3001')
});