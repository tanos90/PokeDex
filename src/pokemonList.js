import React from 'react';
import { API_URL } from './pokeAPI.js';
import Pokemon from './pokemon';
import { Table } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';

export default class PokemonList extends React.Component {
    state = {
        pokemons: [],
        showPokemon: false,
        hasMoreItems: true,
        nextHref: null
    };

    componentDidMount = () => {};

    getPokemons = page => {
        let self = this;
        let url = `${API_URL}/pokemon`;
        if (this.state.nextHref) {
            url = this.state.nextHref;
        }

        qwest.get(url, {}, { cache: true }).then(function(xhr, resp) {
            if (resp) {
                let pokemons = self.state.pokemons;
                resp.results.map(pokemon => pokemons.push(pokemon));
                if (resp.next) {
                    self.setState({
                        pokemons: pokemons,
                        nextHref: resp.next
                    });
                } else {
                    self.setState({
                        hasMoreItems: false
                    });
                }
            }
        });
    };

    showPokemonDetail = () =>
        this.setState({
            showPokemon: true
        });
    getPokemonId = stringId => {
        let strings = stringId.split('/');
        return strings[strings.length - 2];
    };

    render() {
        const { pokemons } = this.state;
        const loader = <div className="loader">Loading ...</div>;
        let pokemonList = [];
        pokemons.map((pokemon, i) =>
            pokemonList.push(
                <Table.Body key={i}>
                    <Table.Row>
                        <Table.Cell>
                            {this.getPokemonId(pokemon.url)}
                        </Table.Cell>
                        <Table.Cell>
                            <Pokemon
                                pokemon={pokemon}
                                getPokemonDetail={this.props.getPokemonDetail}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            )
        );
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.getPokemons.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}
            >
                <Table celled selectable>
                    {pokemonList}
                </Table>
            </InfiniteScroll>
        );
    }
}
