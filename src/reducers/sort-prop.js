import { UPDATE_SORT_PROP, L_NAME_DESC } from '../constants';
export default function (state = L_NAME_DESC, {type, payload}) {
    switch (type) {
        case UPDATE_SORT_PROP:
            return payload;
        default:
            return state;
    }
}