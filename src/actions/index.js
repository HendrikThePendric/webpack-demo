import {
    ADD_CONTACT,
    UPDATE_SORT_PROP,
    UPDATE_FILTER_VALUE,
    TOGGLE_FORM_STATE,
    UPDATE_CUSTOM_SORT
} from '../constants';

const createAction = (type, payload) => {
    return {
        type,
        payload
    };
};

export const addContact = (contact) =>
    createAction(ADD_CONTACT, contact);

export const updateSortProp = (sortProp) =>
    createAction(UPDATE_SORT_PROP, sortProp);

export const updateFilterValue = (val) =>
    createAction(UPDATE_FILTER_VALUE, val);

export const toggleFormState = () =>
    createAction(TOGGLE_FORM_STATE, null);
    
export const updateCustomSortOrder = (contactList) =>
    createAction(UPDATE_CUSTOM_SORT, contactList);