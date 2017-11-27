import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import io from 'socket.io-client';
import auth from 'feathers-authentication-client';


let HOST = 'api.monet.j-reg.ru',
    PORT = '8083';

// if (process.env.NODE_ENV === 'production') {
//     HOST = '127.0.0.1';
//     PORT = '8083';
// }

if ( location.hostname === 'localhost' ) {
    HOST = 'localhost',
    PORT = '3030';
}

const socket = io('http://' + HOST + ':' + PORT);

export const app = feathers()
    .configure( hooks() )
    .configure( socketio( socket ) )
    .configure( auth( { storage: window.localStorage } ) )

export const services = {

    // repeat this line for every service in our backend
    incomeCash:  app.service('income-cash'),
    costCash:    app.service('cost-cash'),
    wish:        app.service('wish'),
    userService: app.service('users'),
};
