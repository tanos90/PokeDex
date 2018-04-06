import { EventEmitter } from 'events';

import AppDispatcher from './AppDispatcher';
import constants from './ActionConstants';
import pokeAPI from './pokeAPI';

import update from 'react-addons-update';

const CHANGE_EVENT = 'change';

class PokemonStore extends EventEmitter {
    constructor() {
        super();
        this.pokemons = [];
    }

    getAll = () => this.pokemons;

    setPokemons(pokemons) {
        const self = this;
        this.pokemons = pokemons;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    handleActions(action) {
        const self = this;
        switch (action.type) {
            case constants.FETCH_POKEMONS_SUCCESS:
                self.setPokemons(action.payload.response);
                self.emitChange();
                break;
            case constants.FETCH_POKEMONS_ERROR:
                alert(action.message);
                break;
            default:
        }
    }
}
const pokemonStore = new PokemonStore();
AppDispatcher.register(pokemonStore.handleActions.bind(pokemonStore));
export default pokemonStore;
