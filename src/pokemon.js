import React from 'react';
import { List } from 'semantic-ui-react';

export default class Pokemon extends React.Component {
    handleClick = event => this.props.getPokemonDetail(this.props.pokemon.url);

    render() {
        const { pokemon } = this.props;
        return (
            <List.Content>
                <List.Header as="a" onClick={this.handleClick}>
                    {pokemon.name}
                </List.Header>
                <List.Description />
            </List.Content>
        );
    }
}
