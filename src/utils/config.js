export const MIN_PASSWORD_LENGTH = 3;

let HOST = 'http://api.monet.j-reg.ru',
    PORT = '80';

if ( location.hostname === 'localhost' ) {
    HOST = 'http://localhost',
    PORT = '3000';
}

if ( location.hostname === 'm1.j-reg.ru' ) {
    HOST = 'http://api.m1.j-reg.ru',
    PORT = '3000';
}

const API_PATH = '/api/v1/'
export const URL_API  = HOST + ':' + PORT + API_PATH
