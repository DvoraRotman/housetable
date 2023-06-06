import { MESSAGE, HOUSE_DETAILS, HOUSE_ID } from '../constants';


const INIT_STATE = {
    houseDetails: {},
    message: '',
    houseID: 0,
};
const VcReducers = (state = INIT_STATE, action) => {
    switch (action.type) {

        case HOUSE_DETAILS:
            return {
                ...state,
                houseDetails: action.payload,
            };
        case MESSAGE:
            return {
                ...state,
                message: action.payload,
            };

        case HOUSE_ID:
            return {
                ...state,
                houseID: action.payload,
            };

        default:
            return state;
    }
};

export default VcReducers;