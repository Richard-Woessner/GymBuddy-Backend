import { log } from 'console';
import ws from 'ws';

const WebSocketWrapper = (
    socket: ws,
    params: {
        [key: string]: string;
    }[]
) => {
    console.log(params);

    socket.on('open', () => log('socket opened', '#bada55'));

    socket.on('message', (message) => console.log(message.toString()));
};

export default WebSocketWrapper;
