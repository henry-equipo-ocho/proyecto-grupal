import axios from 'axios'
import {
    SET_ALL_ACTIVITIES,
    SET_USER_NAME,
    GET_ACTIVITIES,
    SET_LOADING
} from './actions_types'

import swal from 'sweetalert';
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
        const activity = await axios.post('http://localhost:3001/activities')
        dispatch({
            type: GET_ACTIVITIES,
            payload: activity.data.data
        });
    };
};

export function setAllActivities(value) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            let res = await axios.get(`http://localhost:3001/activities/match/${value}`)
            return dispatch({
                type: SET_ALL_ACTIVITIES,
                payload: res.data.data,
            });
        } catch (error) {
            console.log(error)
            swal("Sorry!!", "Activity not Found", "error")
            dispatch(setLoading(true))

            return dispatch(getActivities())
        };
    };

};

export const setLoading = (Boolean) => {
    return {
        type: SET_LOADING,
        payload: Boolean,
    }
}