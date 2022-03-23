import { SET_USER_NAME } from '../Actions/actions_types';

const initialState = {
    userName: 'viajero',
    activities: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME: {
            return {
                ...state,
                userName: action.payload
            };
        };

        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
            };

        default:
            return state;
    };
};