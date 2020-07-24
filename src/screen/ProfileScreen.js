import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../action/userAction';
import NavTabs from '../component/NavTabs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function ProfileScreen(props) {
    const userInfo = useSelector(state => state.signin);
    const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        if (!userInfo.userInfo) {
            props.history.push("/")
        }
    })

    const handleSignout = () => {
        dispatch(signout());
    }

    return (
        userInfo.userInfo ?
        <div>
            <NavTabs />
            <div className="form">
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {userInfo.userInfo.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Email: {userInfo.userInfo.email}
                        <br />
                        ID: {userInfo.userInfo._id}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleSignout}>
                        Sign Out
                    </Button>
                </CardActions>
            </Card>
            </div>
        </div>
        : null
    )
}

export default ProfileScreen;

const useStyles = makeStyles({
    root: {
      width: 345,
      backgroundColor: "#e0f2f1",
    },
});


