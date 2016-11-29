import React, { Component } from 'react';
import './app.scss';
import AddContact from '../add-contact/add-contact';
import SortContacts from '../sort-contacts/sort-contacts';
import FilterContacts from '../filter-contacts/filter-contacts';
import FavoritesToggler from '../favorites-toggler/favorites-toggler';
import ContactList from '../contact-list/contact-list';

export default class App extends Component {

    render() {
        return (
            <main className="app">
                <div className="add-wrap">
                    <AddContact />
                </div>
                <div className="list-wrap">
                    <h2>Contact list</h2>
                    <FavoritesToggler />
                    <FilterContacts />
                    <SortContacts />
                    <ContactList  />
                </div>
            </main>
        );
    }
}