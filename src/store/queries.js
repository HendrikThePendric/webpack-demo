import {
    F_NAME_ASC,
    F_NAME_DESC,
    L_NAME_ASC,
    L_NAME_DESC,
    PHONE_ASC,
    PHONE_DESC,
    CUSTOM,
    F_NAME,
    L_NAME,
    PHONE
} from '../constants';

// PUBLIC METHODS
export const getVisibleContacts = (state) => {
    const { contacts, filterVal, favoritesOnly, sortProp } = state;
    // Filtered contact list, new array in both cases
    const filteredContacts = filterContacts(contacts, filterVal, favoritesOnly);
    // Sorted list, a sorted version of that new array
    return sortContactsBy(filteredContacts, sortProp);
};

export const getContactsCount = (state) => {
    return state.contacts.length;
};


// PRIVATE METHODS
function filterContacts(contacts, filterVal, favoritesOnly) {
    if (!filterVal && !favoritesOnly) {
        return [...contacts];
    }
    return contacts.filter(contact => contactsFilter(contact, filterVal.toLowerCase(), favoritesOnly));
}

function contactsFilter(contact, filterVal, favoritesOnly) {
    if (favoritesOnly && !contact.isFavorite) {
        return false;
    }
    const searchStr = `${contact[F_NAME]}|${contact[L_NAME]}|${contact[PHONE]}`.toLowerCase();
    if (searchStr.indexOf(filterVal) !== -1) {
        return true;
    }
    return false;
}

function sortContactsBy(contacts, sortProp) {
    if (sortProp === CUSTOM) {
        return contacts;
    }
    return contacts.sort((a, b) => {
        switch (sortProp) {
        case F_NAME_ASC:
            return compare(a.firstName, b.firstName);
        case F_NAME_DESC:
            return compare(b.firstName, a.firstName);
        case L_NAME_ASC:
            return compare(a.lastName, b.lastName);
        case L_NAME_DESC:
            return compare(b.lastName, a.lastName);
        case PHONE_ASC:
            return compare(a.phone, b.phone);
        case PHONE_DESC:
            return compare(b.phone, a.phone);
        // There should not be a default scenario but we include it to make the linter happy
        default:
            return compare(a.lastName, b.lastName);
        }
    });
}

function compare(a, b) {
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}