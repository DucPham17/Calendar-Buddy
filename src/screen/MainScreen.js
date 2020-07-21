import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../action/userAction';
import { getEventList } from '../action/eventProcessAction';
import Card from 'react-bootstrap/Card'

function MainScreen(props) {
    const [date, setDate] = useState("");
    const userInfo = useSelector(state => state.signin);
    const eventList = useSelector(state => state.eventList);
    console.log(eventList);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userInfo.userInfo) {
            props.history.push("/")
        }
    })

    const handleSignout = () => {
        dispatch(signout());
    }
    const handleCreateEvent = () => {
        props.history.push("/createevent")
    }
    const handleFindFreeTime = () => {
        props.history.push("/findfreetime")
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (userInfo.userInfo) {
            const dateInfo = {
                email: userInfo.userInfo.email,
                date: date
            }
            dispatch(getEventList(dateInfo));
        }

    }
    

    return (
        userInfo.userInfo ?
            <div>
                <h4>Name: {userInfo.userInfo.name}</h4>
                <h4>Email: {userInfo.userInfo.email}</h4>
                <h4>Id: {userInfo.userInfo._id}</h4>
                <button className="button primary" onClick={handleSignout}>SignOut</button>
                <button className="button primary" onClick={handleFindFreeTime}>Find Free Time</button>
                <button className="button primary" onClick={handleCreateEvent}>Create Event</button>
                <form method="POST" onSubmit={submitHandler}>
                    <ul className="form--container">
                        <li>
                            <label htmlFor="date">Check Date: </label>
                            <input type="string" name="date" id="date" placeholder="Form: yyyy/mm/dd" onChange={(event) => { setDate(event.target.value) }}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Check Date</button>
                        </li>
                    </ul>
                </form>
                {eventList.eventList ? <ul className="event-container">{eventList.eventList.map(d =>
                    <li>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{d.title}</Card.Title>
                                <Card.Text>
                                    {"Start Time: "+ new Date(d.startDate).toDateString()+" "+new Date(d.startDate).getHours()+":"+new Date(d.startDate).getMinutes()}
                                    <br />
                                    {"End Time: "+new Date(d.endDate).toDateString()+" "+new Date(d.endDate).getHours()+":"+new Date(d.endDate).getMinutes()}
                                </Card.Text>
                                <Card.Link href="#" className="event-container-link">Delete  </Card.Link>
                                <Card.Link href="#" className="event-container-link">Update</Card.Link>
                            </Card.Body>
                        </Card>
                    </li>
                )}</ul> : null}
            </div>
            : null
    )
}

export default MainScreen;