import {mockContacts} from '../data/mock-contacts';
import {L_NAME_ASC} from '../constants';

export default function () {
    return {
        contacts: mockContacts,
        sortProp: L_NAME_ASC,
        showForm: false
    }
}