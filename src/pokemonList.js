import React from 'react';
import PokemonStore from './pokemonStore.js';
import PokemonActions from './PokemonActions.js';
import pokeAPI from './pokeAPI.js';

export default class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        this.getPokemons = this.getPokemons.bind(this);
        this.state = { pokemons: pokeAPI.fetchPokemons() };
    }

    componentWillMount() {
        PokemonStore.addChangeListener(this.getPokemons);
    }

    getPokemons() {
        this.setState({
            pokemons: pokeAPI.fetchPokemons()
        });
    }

    render() {
        const { pokemons } = this.state;
        console.log(pokemons);
        if (!pokemons) {
            let pokemonsList = pokemons.map(pokemon => (
                <div class="col-md-12 well" key={pokemon.name}>
                    <span>
                        Pokemon Name: <b>{pokemon.name}</b>{' '}
                    </span>
                </div>
            ));
            return <div>{pokemonsList}</div>;
        }
        return null;
    }
}
