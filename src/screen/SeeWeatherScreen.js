import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import WeatherDisplay from '../component/WeatherDisplay';

function SeeWeatherScreen(props) {
    const [long, setLong] = useState();
    const [lat, setLat] = useState();
    const [dew_point,setDew_Point] = useState();
    const [feels_like,setFeel_Like] = useState();
    const [humidity,setHumidity] = useState();
    const [pressure,setPressure] = useState();
    const [sunrise,setSunrise] = useState();
    const [sunset,setSunset] = useState();
    const [temp,setTemp] = useState();
    const [description,setDescription] = useState();
    const [wind_deg,setWind_Deg] = useState();
    const [wind_speed,setWind_Speed] = useState();

    useEffect(() => {
        if (long == undefined) {
            console.log("a");
            navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos)
                setLong(pos.coords.longitude)
                setLat(pos.coords.latitude)
            })
        }

    })

    const handleGetWeather = async () => {
        console.log(long)
        if (long && lat) {
            const weather = await Axios.get("https://api.openweathermap.org/data/2.5/onecall",
                {
                    params: {
                        lat: lat,
                        lon: long,
                        exclude: "hourly",
                        units : "metric",
                        appid: "7916bb0a34044558c95c509ee166144a"
                    }
                })
                console.log(weather.data.current);
                setDew_Point(weather.data.current.dew_point);
                setFeel_Like(weather.data.current.feels_like);
                setHumidity(weather.data.current.humidity);
                setPressure(weather.data.current.pressure);
                setSunrise(weather.data.current.sunrise);
                setSunset(weather.data.current.sunset);
                setTemp(weather.data.current.temp);
                setDescription(weather.data.current.weather[0].description);
                setWind_Deg(weather.data.current.wind_deg);
                setWind_Speed(weather.data.current.wind_speed);
        }

    }

    return (
        <div>
            <button className="button primary" onClick={handleGetWeather}>Your weather and our suggestion!</button>
            {dew_point?<div>
                <WeatherDisplay dew_point={dew_point} feels_like={feels_like} humidity={humidity}
                pressure={pressure} sunrise={sunrise} sunset={sunset} temp={temp} description={description} wind_deg={wind_deg} wind_speed={wind_speed}  />
            </div> :null}
        </div>
    )
}

export default SeeWeatherScreen;