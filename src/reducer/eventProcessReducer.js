import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAIL } from "../constant/eventProcess";

export const eventProcessReducer = (state=[],action) =>{
    switch(action.type){
        case GET_EVENT_REQUEST:
            return {loading: true}
        case GET_EVENT_SUCCESS:
            return {loading: false, eventList: action.payload}
        case GET_EVENT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}