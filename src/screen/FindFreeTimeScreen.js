import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFreeTime } from '../action/findFreetimeAction';
import NavTabs from '../component/NavTabs';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
function FindFreeTimeScreen(props) {
    const[date, setDate] = useState();
    const[friendId, setFriendId] = useState();
    const userInfo = useSelector(state => state.signin);
    const freetime = useSelector(state => state.freetime);
    const{loading,freetimeSlot,error} = freetime;
    const dispatch = useDispatch();
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        if(userInfo.userInfo && date && friendId){
            dispatch(getFreeTime(date,friendId,userInfo.userInfo._id));
        }  
    }
    const handleSeeWeather = () => {
        props.history.push("/seeweather")
    }

    return(
        <div>
        <NavTabs />
        <Fab className={classes.fab} variant="extended" color="primary" onClick={handleSeeWeather}>
                    <AddIcon />
                    What to do today?
                </Fab>

        <div className="form">             
            <form method="POST" onSubmit={submitHandler}>
                <ul className="request-form--container">
                    <li>
                    {loading? <div>Loading...</div> : error? <div>Wrong in Id user or date form</div> : null}
                    </li>
                    <li >
                        <label htmlFor="friendId">Friend ID: </label>
                        <input type="string" name="friendId" id="friendId" placeholder="Friend Id" onChange={(event) => {setFriendId(event.target.value)}}></input>
                    </li>
                    <li>
                        <label htmlFor="date">Date: </label>
                        <input type="string" name="date" id="date"placeholder="yyyy-mm-dd" onChange={(event) => {setDate(event.target.value)}}></input>
                    </li>
                    <li><button type="submit">Find</button></li>
                </ul>
            </form>
            {freetimeSlot?  <ul style={{color:'#4db6ac', fontWeight: 900}}>You and your friend are both available at these times:{freetimeSlot.map(d =>
                <Card className={classes.root} key={freetimeSlot.indexOf(d)}>
                <CardContent>
                    <Typography variant="body3" color="textSecondary" component="p">
                        {"Start Time: "+ d.start}
                        <br />
                        {"End Time: "+d.end}
                    </Typography>
                </CardContent>
            </Card>
            )}</ul> : null}
            </div>
        </div>
    )
}

export default FindFreeTimeScreen;

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        backgroundColor: "#e0f2f1",
        margin: 12,
    },
}));