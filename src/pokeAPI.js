import qwest from 'qwest';
import 'babel-polyfill';

const API_URL = 'https://pokeapi.co/api/v2';

let pokeAPI = {
    fetchPokemons() {
        return qwest.get(`${API_URL}/pokemon`, {}, { cache: true });
    },

    fetchPokemonDetail(url) {
        let details = {};
        return new Promise((resolve, reject) => {
            qwest
                .get(url, {}, { cache: true })
                .then((xhr, response) => {
                    details = response;
                    return qwest.get(response.species.url, {}, { cache: true });
                })
                .then((xhr, response) => {
                    details.species = response;
                    resolve(details);
                });
        });
    }
};

export { pokeAPI, API_URL };
