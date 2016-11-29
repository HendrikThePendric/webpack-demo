import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import { toggleFavoritesOnly } from '../../actions';

class FavoritesToggler extends Component {

    render() {
        const { favoritesOnly, toggleFavoritesOnly } = this.props;
        return (
            <Toggle
                label="Show favorites only"
                labelPosition="right"
                toggled={favoritesOnly}
                onToggle={toggleFavoritesOnly}
                style={{marginBottom: '-15px'}}
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        favoritesOnly: state.favoritesOnly
    };
}
export default connect(mapStateToProps, { toggleFavoritesOnly })(FavoritesToggler);