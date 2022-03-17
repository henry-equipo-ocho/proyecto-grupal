import server from './src/app';
import './src/db';

server.listen(server.get('port'));
console.log('Server on port', server.get('port'))