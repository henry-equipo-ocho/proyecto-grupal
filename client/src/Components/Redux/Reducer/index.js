import {
    GET_ACTIVITIES, GET_CITIES, GET_COUNTRIES, ORDER_ACTIVITIES_BY_CITY,
    ORDER_ACTIVITIES_BY_PRICE, PAYMENT_ORDER, SET_ALL_ACTIVITIES, SET_LOADING, SET_TOKEN, SET_USER_NAME
} from '../Actions/actions_types';

const initialState = {
    userName: 'viajero',
    allActivities: [],
    currentActivities: [],
    countries: [],
    cities: [],
    loading: true,
    payment: [],
    token: ''
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            };

        case SET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload,
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
                currentActivities: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
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
        case PAYMENT_ORDER:
            return {
                ...state,
                payment: action.payload
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    };
};