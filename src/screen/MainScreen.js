import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getEventList } from '../action/eventProcessAction';
import { deleteEvent } from '../action/eventAction';
import NavTabs from '../component/NavTabs';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function MainScreen(props) {
    const [date, setDate] = useState("");
    const userInfo = useSelector(state => state.signin);
    const eventList = useSelector(state => state.eventList);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const event = useSelector(state => state.event);
    const{loading, payload,error} = event;

    useEffect(() => {
        if (!userInfo.userInfo) {
            props.history.push("/")
        }
    })

    const handleCreateEvent = () => {
        props.history.push("/createevent")
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

    function deleteHandler(id){
        if (userInfo.userInfo) {
            const event = {
                _id: id,
                email: userInfo.userInfo.email
            }
            dispatch(deleteEvent(event));
        }
        window.location.reload()
    }
    
    return (
        userInfo.userInfo ?
            <div>
                <NavTabs />
                <Fab className={classes.fab} variant="extended" color="primary" onClick={handleCreateEvent}>
                    <AddIcon />
                    Add Event
                </Fab>  
                <div className="form">    
                    <form method="POST" onSubmit={submitHandler}>
                        <ul className="request-form--container">
                            <li>
                                <label htmlFor="date">Check Date: </label>
                                <input type="string" name="date" id="date" placeholder="yyyy-mm-dd" onChange={(event) => { setDate(event.target.value) }}></input>
                            </li>
                            <li>
                                <button type="submit">Check Date</button>
                            </li>
                        </ul>
                    </form>
                    {eventList.eventList ? <ul>{eventList.eventList.map(d =>
                        <Card className={classes.root} key={d._id}>
                        <CardHeader
                            title= {d.title}
                            action={
                                <IconButton color="primary" href={"/updateevent?id="+d._id}>
                                    <EditIcon />
                                </IconButton>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {"Start Time: "+ new Date(d.startDate).toDateString()+" "+new Date(d.startDate).getHours()+":"+new Date(d.startDate).getMinutes()}
                                <br />
                                {"End Time: "+new Date(d.endDate).toDateString()+" "+new Date(d.endDate).getHours()+":"+new Date(d.endDate).getMinutes()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => deleteHandler(d._id)}>
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                    )}</ul> : null}
                </div>
            </div>
        : null
    )
}

export default MainScreen;

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        backgroundColor: "#e0f2f1",
        margin: 12,
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(23),
        right: theme.spacing(5),
    },
}));

