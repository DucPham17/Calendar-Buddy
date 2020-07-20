import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFreeTime } from '../action/findFreetimeAction';
import Card from 'react-bootstrap/Card'
function FindFreeTimeScreen(props) {


    const[date, setDate] = useState();
    const[friendId, setFriendId] = useState();
    const userInfo = useSelector(state => state.signin);
    const freetime = useSelector(state => state.freetime);
    const{loading,freetimeSlot,error} = freetime;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(userInfo.userInfo && date && friendId){
            dispatch(getFreeTime(date,friendId,userInfo.userInfo._id));
        }  
    }
    return(
        <div className="form">             
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                       <h3> Find Free Time </h3>
                    </li>
                    <li>
                    {loading? <div>Loading...</div> : error? <div>Wrong in Id user or date form</div> : null}
                    </li>
                    <li >
                        <label htmlFor="friendId">Friend Id: </label>
                        <input type="string" name="friendId" id="friendId" placeholder="Friend Id" onChange={(event) => {setFriendId(event.target.value)}}></input>
                    </li>
                    <li>
                        <label htmlFor="date">Date: </label>
                        <input type="string" name="date" id="date"placeholder="Form: yyyy/mm/dd" onChange={(event) => {setDate(event.target.value)}}></input>
                    </li>
                    <li><button type="submit" className="button primary">Find</button></li>
                </ul>
            </form>
            <div>
                <h3>Free Time For Meeting:</h3>
            {freetimeSlot? <ul className="event-container">{freetimeSlot.map(d =>
                    <li key={freetimeSlot.indexOf(d)}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{d.title}</Card.Title>
                                <Card.Text>
                                    {"Start Time: "+ d.start}
                                    <br />
                                    {"End Time: "+d.end}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </li>
                )}</ul> : null}
            </div>
        </div>
    )
}
export default FindFreeTimeScreen;