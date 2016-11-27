import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    UPDATE_SORT_PROP,
    UPDATE_FILTER_VALUE,
    SHOW_CONTACT_FORM,
    HIDE_CONTACT_FORM,
    UPDATE_CUSTOM_SORT,
    SET_CURRENT_CONTACT,
    CLEAR_CURRENT_CONTACT
} from '../constants';

const createAction = (type, payload) => {
    return {
        type,
        payload
    };
};

export const addContact = (contact) =>
    createAction(ADD_CONTACT, contact);

export const updateContact = (contact) =>
    createAction(UPDATE_CONTACT, contact);

export const deleteContact = (contact) =>
    createAction(DELETE_CONTACT, contact);

export const updateSortProp = (sortProp) =>
    createAction(UPDATE_SORT_PROP, sortProp);

export const updateFilterValue = (val) =>
    createAction(UPDATE_FILTER_VALUE, val);

export const showAddContactForm = () =>
    createAction(SHOW_CONTACT_FORM, null);

export const hideAddContactForm = () =>
    createAction(HIDE_CONTACT_FORM, null);
    
export const updateCustomSortOrder = (contactList) =>
    createAction(UPDATE_CUSTOM_SORT, contactList);

export const setCurrentContact = (contactIndex) =>
    createAction(SET_CURRENT_CONTACT, contactIndex);
    
export const clearCurrentContact = () =>
    createAction(CLEAR_CURRENT_CONTACT, null);