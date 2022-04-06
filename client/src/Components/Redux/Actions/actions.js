import axios from 'axios';
import Swal from 'sweetalert2';
import {
    GET_ACTIVITIES, GET_CITIES, GET_COUNTRIES, ORDER_ACTIVITIES_BY_PRICE, PAYMENT_ORDER, SET_ALL_ACTIVITIES, SET_LOADING, SET_TOKEN, SET_USER_NAME
} from './actions_types';

//import { SET_USER_NAME } from './actions_types';

export function setUserName(payload) {
    return {
        type: SET_USER_NAME,
        payload,
    };
};

export function getActivities() {
    return async function (dispatch) {
        dispatch(setLoading(true))
        const { data: { data } } = await axios.post('http://localhost:3001/activities')
        dispatch({
            type: GET_ACTIVITIES,
            payload: data
        });
    };
};

export function getCountries() {
    return async function (dispatch) {
        const countries = await axios.get('http://localhost:3001/locations/countries');
        return dispatch({
            type: GET_COUNTRIES,
            payload: countries.data.data,
        });
    };
};

export function getCities() {
    return async function (dispatch) {
        const cities = await axios.get('http://localhost:3001/locations/cities');
        return dispatch({
            type: GET_CITIES,
            payload: cities.data.data,
        });
    };
};

export function setAllActivities(value) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            let res = await axios.get(`http://localhost:3001/activities/match/${value}`);
            return dispatch({
                type: SET_ALL_ACTIVITIES,
                payload: res.data.data,
            });
        } catch (error) {
            Swal.fire({
                title: 'Sorry!',
                text: 'Activity not found',
                icon: 'error',
                color: 'white',
                background: '#00498b',
                confirmButtonColor: '#24c59c'
            })
            dispatch(setLoading(true))

            return dispatch(getActivities())
        };
    };
};

export function orderActivitiesByPrice(payload) {
    return async function (dispatch) {
        dispatch(setLoading(true));
        const prices = await axios.post('http://localhost:3001/activities/orderByPrice', payload);
        return dispatch({
            type: ORDER_ACTIVITIES_BY_PRICE,
            payload: prices.data.data,
        });
    };
};

export function paymentOrder(payment) {
    return async function (dispatch) {
        try {
            window.open(payment.data.data.href, '_blank')
            return dispatch({
                type: PAYMENT_ORDER,
                payload: payment.data.data,
            });
        } catch (response) {
            console.log(response.request)
        };
    };
};

export const setLoading = (Boolean) => {
    return {
        type: SET_LOADING,
        payload: Boolean,
    };
};

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token,
    }
}