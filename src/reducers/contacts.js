import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, UPDATE_CUSTOM_SORT } from '../constants';
export default function (state = [], {type, payload}) {
    switch (type) {
        case ADD_CONTACT:
            return [payload, ...state];
        case UPDATE_CONTACT:
            return updateItemInList(state, payload);
        case DELETE_CONTACT:
            // Payload is ID
            return state.filter(item => item.id !== payload);
        case UPDATE_CUSTOM_SORT:
            // Loop through list based on current order and update sequenceId descending
            return reorderList(state, payload);
        default:
            return state;
    }
}

function updateItemInList(list, { currContact, values}) {
    const newList    = [...list];
    const newContact = {...currContact, ...values};
    const index      = getIndexById(list, currContact.id);
    newList[index]   = newContact;
    return newList;
}

function getIndexById(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    console.error('ID not found in list');
}

function reorderList(originalList, { insertContactId, siblingContactId, insertBefore }) {
    let reorderedList   = [...originalList];
    const {insertContactIndex, siblingContactIndex} = getReorderIndices(originalList, insertContactId, siblingContactId);
    // This does not only gets the reordered contact but also removes it from the original list (mutation-alert)
    const insertContact = reorderedList.splice(insertContactIndex, 1)[0];
    const insertIndex   = insertBefore ? siblingContactIndex - 1 : siblingContactIndex;
    reorderedList.splice(insertIndex, 0, insertContact);
    return reorderedList;
}

function getReorderIndices(list, insertContactId, siblingContactId)  {
    let i, currId, insertContactIndex, siblingContactIndex;
    i = 0;
    while (typeof insertContactIndex === 'undefined' || typeof siblingContactIndex === 'undefined') {
        currId = list[i].id;
        if (currId === insertContactId) {
            insertContactIndex = i;
        }
        if (currId === siblingContactId) {
            // Sibling after insert item
            // Plus one because insertContact will be added before it
            if (typeof insertContactIndex === 'undefined') {
                siblingContactIndex = i + 1;
            } else {
                siblingContactIndex = i;
            }
        }
        i++;
    }
    return { insertContactIndex, siblingContactIndex };
}