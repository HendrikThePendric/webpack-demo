import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reorder from 'react-reorder';
import { getVisibleContacts } from '../../store';
import {ListItem} from 'material-ui/List';
import { updateCustomSortOrder } from '../../actions';
import {CUSTOM} from '../../constants';
import './contact-list.scss';

const ContactListItem = ({item: {firstName, lastName, phone}, sharedProps: {disabled}}) => {
    return (
        <ListItem
            primaryText={firstName +' '+ lastName}
            secondaryText={phone}
            disabled={disabled}
        />
    );
};

class ContactList extends Component {

    render() {
        const { contacts, sortProp , updateCustomSortOrder } = this.props;
        const disableReorder = sortProp !== CUSTOM;
        return (
            <Reorder
                // The key of each object in your list to use as the element key
                itemKey='id'
                // Lock horizontal to have a vertical list
                lock='horizontal'
                // The milliseconds to hold an item for before dragging begins
                holdTime='0'
                // The list to display
                list={contacts}
                // A template to display for each list item
                template={ContactListItem}
                // Function that is called once a reorder has been performed
                callback={(event, item, index, newIndex, list) => updateCustomSortOrder(list)}
                // Class to be applied to the outer list element
                listClass='contact-list'
                // Class to be applied to each list item's wrapper element
                itemClass='list-item'
                // The key to compare from the selected item object with each item object
                selectedKey='sequenceId'
                // Allows reordering to be disabled
                disableReorder={disableReorder}
                sharedProps={{disabled: disableReorder}}
            />
        );
    };
};

function mapStateToProps (state) {
    return {
        contacts: getVisibleContacts(state),
        sortProp: state.sortProp
    };
}
export default connect(mapStateToProps, { updateCustomSortOrder })(ContactList);
