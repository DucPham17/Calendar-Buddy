import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';

function WeatherDisplay(props) {
    const classes = useStyles();
    
    return (
        <div className="weather-form">
            <Card className={classes.root}> 
                <CardHeader title="Today's Weather:" />
                <CardContent>
                    <div>Dew Point: {props.dew_point} Celsius</div>
                    <div>Temperature Feel Like: {props.feels_like} Celsius</div>
                    <div>Humidity: {props.humidity}%</div>
                    <div>Pressure: {props.pressure}</div>
                    <div>Real Temperature: {props.temp} Celsius</div>
                    <div>Wind Degree: {props.wind_deg}</div>
                    <div>Wind Speed: {props.wind_speed}m/s</div>
                    <div>Description: {props.description + " "}</div>
                    <div>{props.feels_like < 10 ? 
                    <div>
                        <i className='far fa-snowflake' style={{fontSize: 36}}></i>
                        <h3>It will be cold, you need more clothes</h3>
                        <i className='far fa-snowflake' style={{fontSize: 36}}></i>
                        
                    </div>
                     : 
                    <div>
                        <i className='far fa-sun' style={{fontSize: 36}}></i>
                        <h3>It will be warm today, Go outside and do something </h3>
                        <i className='far fa-sun' style={{fontSize: 36}}></i>
                        
                        </div>}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default WeatherDisplay;

const useStyles = makeStyles({
    root: {
      width: 500,
      backgroundColor: "#fafafa",
    },
});