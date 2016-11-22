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
    let visibleContacts;
    const { contacts, filterVal, sortProp } = state;
    // Filtered contact list, new array in both cases
    visibleContacts = filterContacts(contacts, filterVal);
    // Sorted list, a sorted version of that new array
    visibleContacts = sortContactsBy(visibleContacts, sortProp);
    return visibleContacts;
};

export const getContactsCount = (state) => {
    return state.contacts.length;
};

export const getNextSequenceId = (state) => {
    return state.contacts.length + 1;
};


// PRIVATE METHODS
function filterContacts(contacts, filterVal) {
    if (!filterVal) {
        return [...contacts];
    }
    return contacts.filter(contact => anyPropMatchesFilter(contact, filterVal.toLowerCase()));
}

function anyPropMatchesFilter(contact, filterVal) {
    const contactProps = [F_NAME, L_NAME, PHONE];
    for (var i = 0; i < contactProps.length; i++) {
        if (contact[contactProps[i]].toLowerCase().indexOf(filterVal) !== -1) {
            return true;
        }
    }
    return false;
}

function sortContactsBy(contacts, sortProp) {
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
        case CUSTOM:
            return b.sequenceId - a.sequenceId;
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