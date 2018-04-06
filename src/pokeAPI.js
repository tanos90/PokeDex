import 'whatwg-fetch';
import axios from 'axios';
import 'babel-polyfill';

const API_URL = 'http://pokeapi.co/api/v2'; //The API_URL has moved into the constants file
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
};

let pokeAPI = {
    fetchPokemons() {
        return axios.get(`${API_URL}/pokemon`).then(response => {
            response.data;
        });
    }
};

export default pokeAPI;
