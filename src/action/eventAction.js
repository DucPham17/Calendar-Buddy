import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL } from "../constant/eventConst"
import Axios from "axios";

export const createEvent = (event) => async (dispatch,getState) => {
    dispatch({type: CREATE_EVENT_REQUEST});
    try {
        const { signin: { userInfo } } = getState();
        const {eventCreated} = await Axios.post("/api/event/createevent",event, {
            headers: {
                'Authorization': 'DucPham' + userInfo.token
            }
        })
        console.log(eventCreated);
        dispatch({
            type: CREATE_EVENT_SUCCESS,payload: eventCreated
        })

    } catch (error) {
        dispatch({
            type: CREATE_EVENT_FAIL, error: error
        })
    }
}

export const updateEvent = (event) => async (dispatch,getState) => {
    try {
        const { signin: { userInfo } } = getState();
        const {eventCreated} = await Axios.post("/api/event/updateevent",event, {
            headers: {
                'Authorization': 'DucPham' + userInfo.token
            }
        })
        console.log(eventCreated);
        

    } catch (error) {
        console.log(error);
    }
}