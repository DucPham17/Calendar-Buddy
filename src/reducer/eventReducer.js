import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL } from "../constant/eventConst";

export const eventReducer = (state={},action) => {
    switch(action.type){
        case CREATE_EVENT_REQUEST:
            return {loading : true};
        case CREATE_EVENT_SUCCESS:
            return {loading : false, payload: action.payload};
        case CREATE_EVENT_FAIL:
            return {loading : false, error: action.error};
        default:
            return state
    }
}