import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './pokemonList.js';
import { pokeAPI, API_URL } from './pokeAPI.js';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Sidebar,
    Segment,
    Image,
    List,
    Button,
    Menu
} from 'semantic-ui-react';
import PokemonDetails from './pokemonDetail';

export default class App extends React.Component {
    state = {
        showPokemon: false,
        pokemonDetails: { sprites: { front_shiny: '' } }
    };
    getPokemonDetail = url =>
        pokeAPI.fetchPokemonDetail(url).then(response => {
            this.setState({
                pokemonDetails: response.data
            });
            this.showPokemonDetail();
        });
    hidePokemon = () =>
        this.setState({
            showPokemon: false
        });
    showPokemonDetail = () =>
        this.setState({
            showPokemon: true
        });
    handleClickTop = () => {
        window.scrollTo(0, 0);
    };
    render() {
        const { pokemonDetails, showPokemon } = this.state;
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item as="a" header>
                            <Image
                                size="mini"
                                src={logo}
                                alt="logo"
                                style={{ marginRight: '1.5em' }}
                            />
                            PokeDex
                        </Menu.Item>
                        <Menu.Item as="a" onClick={this.handleClickTop}>
                            Top
                        </Menu.Item>

                        <Dropdown item simple text="Dropdown">
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>Header Item</Dropdown.Header>
                                <Dropdown.Item>
                                    <i className="dropdown icon" />
                                    <span className="text">Submenu</span>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>List Item</Dropdown.Item>
                                        <Dropdown.Item>List Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                </Menu>

                <Container text style={{ marginTop: '7em' }}>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        width="thin"
                        direction="right"
                        visible={showPokemon}
                        icon="labeled"
                        vertical
                    >
                        <Button onClick={this.hidePokemon}>Hide</Button>
                        <PokemonDetails pokemonDetails={pokemonDetails} />
                    </Sidebar>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <Header as="h1">Pokemon List</Header>
                                <PokemonList
                                    showPokemonDetail={this.showPokemonDetail}
                                    getPokemonDetail={this.getPokemonDetail}
                                />>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Container>

                <Segment
                    inverted
                    vertical
                    style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
                >
                    <Container textAlign="center">
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header
                                        inverted
                                        as="h4"
                                        content="Group 1"
                                    />
                                    <List link inverted>
                                        <List.Item as="a">Link One</List.Item>
                                        <List.Item as="a">Link Two</List.Item>
                                        <List.Item as="a">Link Three</List.Item>
                                        <List.Item as="a">Link Four</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header
                                        inverted
                                        as="h4"
                                        content="Group 2"
                                    />
                                    <List link inverted>
                                        <List.Item as="a">Link One</List.Item>
                                        <List.Item as="a">Link Two</List.Item>
                                        <List.Item as="a">Link Three</List.Item>
                                        <List.Item as="a">Link Four</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header
                                        inverted
                                        as="h4"
                                        content="Group 3"
                                    />
                                    <List link inverted>
                                        <List.Item as="a">Link One</List.Item>
                                        <List.Item as="a">Link Two</List.Item>
                                        <List.Item as="a">Link Three</List.Item>
                                        <List.Item as="a">Link Four</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header
                                        inverted
                                        as="h4"
                                        content="Footer Header"
                                    />
                                    <p>
                                        Extra space for a call to action inside
                                        the footer that could help re-engage
                                        users.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Divider inverted section />
                        <Image centered size="mini" src="/logo.png" />
                        <List horizontal inverted divided link>
                            <List.Item as="a" href="#">
                                Site Map
                            </List.Item>
                            <List.Item as="a" href="#">
                                Contact Us
                            </List.Item>
                            <List.Item as="a" href="#">
                                Terms and Conditions
                            </List.Item>
                            <List.Item as="a" href="#">
                                Privacy Policy
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </div>
        );
    }
}
