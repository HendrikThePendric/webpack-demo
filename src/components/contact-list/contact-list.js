import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reorder from 'react-reorder';
import { getVisibleContacts } from '../../store';
import {ListItem} from 'material-ui/List';
import { updateCustomSortOrder, setCurrentContact, showAddContactForm } from '../../actions';
import {CUSTOM} from '../../constants';
import './contact-list.scss';

const ContactListItem = ({item: {firstName, lastName, phone}}) => {
    return (
        <ListItem
            primaryText={firstName +' '+ lastName}
            secondaryText={phone}
        />
    );
};

class ContactList extends Component {

    onContactClick(event, contact, index) {
        const { setCurrentContact, showForm, showAddContactForm } = this.props;
        const currContact = {...contact};
        if (!showForm) {
            showAddContactForm();
        }
        setCurrentContact(currContact);
    }

    onReorder(event, item, index, newIndex, list) {
        const { updateCustomSortOrder } = this.props;
        const insertBefore        = newIndex === 0;
        const insertContactId     = item.id;
        const siblingContactIndex = insertBefore ? 1 : newIndex - 1;
        const siblingContactId    = list[siblingContactIndex].id;
        updateCustomSortOrder({insertContactId, siblingContactId, insertBefore});
    }

    render() {
        const { contacts, sortProp } = this.props;
        const disableReorder = sortProp !== CUSTOM;
        return (
            <Reorder
                // The key of each object in your list to use as the element key
                itemKey='id'
                // Lock horizontal to have a vertical list
                lock='horizontal'
                // The milliseconds to hold an item for before dragging begins
                holdTime='310'
                // The list to display
                list={contacts}
                // A template to display for each list item
                template={ContactListItem}
                // Function that is called once a reorder has been performed
                callback={this.onReorder.bind(this)}
                // Class to be applied to the outer list element
                listClass='contact-list'
                // Class to be applied to each list item's wrapper element
                itemClass='list-item'
                // A function to be called if a list item is clicked (before hold time is up)
                itemClicked={this.onContactClick.bind(this)}
                // The key to compare from the selected item object with each item object
                selectedKey='sequenceId'
                // Allows reordering to be disabled
                disableReorder={disableReorder}
            />
        );
    };
};

function mapStateToProps (state) {
    return {
        contacts: getVisibleContacts(state),
        sortProp: state.sortProp,
        showForm: state.showForm
    };
}
export default connect(
    mapStateToProps, 
    { 
        updateCustomSortOrder, 
        setCurrentContact,
        showAddContactForm
    }
)(ContactList);
