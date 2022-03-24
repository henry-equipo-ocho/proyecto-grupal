import axios from 'axios'
import {
     SET_ALL_ACTIVITIES, 
     SET_USER_NAME,
     GET_ACTIVITIES
     } from './actions_types'

const server = "http://localhost:3001";
import { SET_USER_NAME } from './actions_types';
import axios from 'axios';


export function setUserName(payload){
    return {
        type: SET_USER_NAME,
        payload,
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        const activity = await axios.get(`${server}/activities`)
        dispatch({
            type: GET_ACTIVITIES,
            payload: activity.data
        })
    }
}

export const setAllActivities = (payload) => {
    return {
        type: SET_ALL_ACTIVITIES,
        payload,
    }
    
}

    };
};

export function getActivities() {
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/activities');
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data,
        });
    };
};
