import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';

let HOST = 'localhost',
    PORT = '3030';

// if (process.env.NODE_ENV === 'production') {
//     HOST = 'www.***host***.tld';
//     PORT = '8080';
// }

const socket = io('http://' + HOST + ':' + PORT);

export const app = feathers().configure( socketio( socket ) );

export const services = {

    // repeat this line for every service in our backend
    incomeCash: app.service('income-cash'),
    costCash:   app.service('cost-cash'),
    wish:       app.service('wish'),
};
