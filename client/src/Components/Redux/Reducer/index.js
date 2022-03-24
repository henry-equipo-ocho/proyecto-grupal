import {
    SET_USER_NAME,
    SET_ALL_ACTIVITIES,
    GET_ACTIVITIES,

 } from '../Actions/actions_types'

const initialState ={
    userName: 'viajero',
    allActivities: [],
    currentActivities:[],
}
export default function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_ACTIVITIES:
            return {
                ...state,
                currentActivities: action.payload,
                allActivities: action.payload,
            }
        case SET_USER_NAME: 
            return {
                ...state,
                userName: action.payload,
            }
        case SET_ALL_ACTIVITIES: 
            return {
                ...state,
                currentActivities:action.payload,
            }
        
        default:
            return {
                ...state
            }

    }
}