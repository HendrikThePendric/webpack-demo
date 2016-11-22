import React, { Component } from 'react';
import './app.scss';
import { connect } from 'react-redux';
import { getContactsCount } from '../../store';
import AddContact from '../add-contact/add-contact';
import SortContacts from '../sort-contacts/sort-contacts';
import ContactList from '../contact-list/contact-list';

class App extends Component {

    render() {
        const { contactsCount } = this.props;
        return (
            <main className="app">
                <div className="add-wrap">
                    <AddContact />
                </div>
                <div className="list-wrap">
                    <h2>
                        Contact list 
                        <small>({contactsCount} contacts)</small>
                    </h2>
                    <SortContacts />
                    <ContactList  />
                </div>
            </main>
        );
    }
}


function mapStateToProps (state) {
    return {
        contactsCount: getContactsCount(state)
    };
}
export default connect(mapStateToProps)(App);