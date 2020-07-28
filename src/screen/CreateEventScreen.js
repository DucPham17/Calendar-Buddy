import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from '../action/eventAction';



function CreateEventScreen(props) {
    const[title, setTitle] = useState('');
    const[startDate, setStartDate] = useState('');
    const[startTime, setStartTime] = useState('');
    const[endTime, setEndTime] = useState('');
    const userInfo = useSelector(state => state.signin);
    const event = useSelector(state => state.event);
    const{loading, payload,error} = event;
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        if(userInfo.userInfo){
            const event = {
                title : title,
                startDate: startDate,
                startTime : startTime,
                endTime : endTime,
                email: userInfo.userInfo.email
            }
            dispatch(createEvent(event));
            props.history.push('/mainscreen');
        }
        
    }

    return (
        <div className="form">
                     
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form--container">
                    <li>
                       <h3> Create Event </h3>
                    </li>
                    <li>
                    {loading? <div>Loading...</div> : error? <div>Wrong in input</div> : null}
                    </li>
                    <li >
                        <label htmlFor="title">Title: </label>
                        <input type="string" name="title" id="title" placeholder="Title" onChange={(event) => {setTitle(event.target.value)}}></input>
                    </li>
                    <li >
                        <label htmlFor="startDate">Start Date: </label>
                        <input type="string" name="startDate" id="startDate" placeholder="Form: yyyy-mm-dd" onChange={(event) => {setStartDate(event.target.value)}}></input>
                    </li>
                    <li >
                        <label htmlFor="startTime">Start Time: </label>
                        <input type="string" name="startTime" id="startTime" placeholder="Form: hh:mm" onChange={(event) => {setStartTime(event.target.value)}}></input>
                    </li>
                    <li >
                        <label htmlFor="endTime">End Time: </label>
                        <input type="string" name="endTime" id="endTime" placeholder="Form: hh:mm" onChange={(event) => {setEndTime(event.target.value)}}></input>
                    </li>
                    <li><button type="submit" className="button primary">Create Event</button></li>
                </ul>
            </form>
        </div>
    )
}

export default CreateEventScreen;