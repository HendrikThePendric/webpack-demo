import { UPDATE_FILTER_VALUE } from '../constants';
export default function (state = '', {type, payload}) {
    switch (type) {
        case UPDATE_FILTER_VALUE:
            return payload;
        default:
            return state;
    }
}