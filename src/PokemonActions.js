import AppDispatcher from './AppDispatcher';
import constants from './ActionConstants';
import PokeAPI from './pokeAPI';

let PokemonActions = {
    fetchPokemons() {
        AppDispatcher.dispatchAsync(
            PokeAPI.fetchPokemons(),
            {
                request: constants.FETCH_POKEMONS,
                success: constants.FETCH_POKEMONS_SUCCESS,
                failure: constants.FETCH_POKEMONS_ERROR
            },
            {}
        );
    }
};

export default PokemonActions;
