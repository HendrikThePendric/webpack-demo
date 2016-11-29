import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ListItem} from 'material-ui/List';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class ContactListItem extends Component {
    render() {
        const {item: {firstName, lastName, phone, isFavorite, id}, currContactId} = this.props;
        const fontWeight = id === currContactId ? '600' : 'normal';
        const Icon = isFavorite ? ActionFavorite : ActionFavoriteBorder;
        return (
            <ListItem
                primaryText={firstName +' '+ lastName}
                secondaryText={phone}
                rightIcon={<Icon />}
                style={{ fontWeight: fontWeight}}
            />
        );
    }
};

const mapStateToProps = state => 
    ({currContactId: state.currContact ? state.currContact.id : null});

export default connect(mapStateToProps)(ContactListItem);