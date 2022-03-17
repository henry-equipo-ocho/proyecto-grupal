import server from './src/app';
import './src/db';

server.listen(3001, () => {
    console.log('Server listening at 3001')
});