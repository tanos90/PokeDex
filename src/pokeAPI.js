import 'whatwg-fetch';
import axios from 'axios';
import 'babel-polyfill';

const API_URL = 'https://pokeapi.co/api/v2'; //The API_URL has moved into the constants file
// const API_HEADERS = {
//     'Content-Type': 'application/json',
//     Authorization: 'any-string-you-like',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
// };

let pokeAPI = {
    fetchPokemons() {
        return axios.get(`${API_URL}/pokemon`);
    },

    fetchPokemonDetail(url) {
        return axios.get(url);
    }
};

export { pokeAPI, API_URL };
