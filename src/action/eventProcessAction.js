import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAIL } from "../constant/eventProcess"
import Axios from "axios"

export const getEventList = (date) => async(dispatch) => {
    dispatch({
        type: GET_EVENT_REQUEST
    })
    try {
        const eventList = await Axios.post("/api/users/geteventlist",date);
        dispatch({
            type: GET_EVENT_SUCCESS,
            payload: eventList.data
        })
        
    } catch (error) {
        dispatch({
            type: GET_EVENT_FAIL,
            payload: error
        })
    }
}