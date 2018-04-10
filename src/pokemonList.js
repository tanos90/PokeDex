import React from 'react';
import { pokeAPI, API_URL } from './pokeAPI.js';
import Pokemon from './pokemon';
import PokemonDetails from './pokemonDetail';
import {
    Table,
    List,
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header
} from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';

export default class PokemonList extends React.Component {
    state = {
        pokemons: [],
        showPokemon: false,
        pokemonDetails: { sprites: { front_shiny: '' } },
        hasMoreItems: true,
        nextHref: null
    };

    componentDidMount = () => {};

    getPokemons = page => {
        console.log(page);
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
                    console.log(self.state);
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
    hidePokemon = () =>
        this.setState({
            showPokemon: false
        });

    render() {
        const { pokemons, pokemonDetails, showPokemon } = this.state;
        const loader = <div className="loader">Loading ...</div>;
        console.log(this.props);
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
