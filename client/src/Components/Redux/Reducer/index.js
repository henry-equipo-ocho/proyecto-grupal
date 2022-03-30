import {
    SET_USER_NAME,
    SET_ALL_ACTIVITIES,
    GET_ACTIVITIES,
    SET_LOADING,
    ORDER_ACTIVITIES_BY_CITY,
    ORDER_ACTIVITIES_BY_PRICE,
    GET_COUNTRIES,
    GET_CITIES,

} from '../Actions/actions_types';

const initialState = {
    userName: 'viajero',
    allActivities: [],
    currentActivities: [],
    countries: [],
    cities: [],
    loading: true,
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            };

        case SET_ALL_ACTIVITIES:
            let value = action.payload;
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ORDER_ACTIVITIES_BY_CITY:
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload,
            };
        case ORDER_ACTIVITIES_BY_PRICE:
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload,
            };
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            };
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload,
            };

        default:
            return state;
    };
};