import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp(){
    const [weather, setWeather] = useState({
        city : "Delhi",
        temp : 25.05,
        humidity : 47,
        min_temp : 25.05,
        max_temp : 30.05,
        description:"haze",
        feelslike : 26.09
    })

    let updateInfo = (result) => {
        setWeather(result)
    }
    return(
        <div style={{textAlign : "center"}}>
            <h1>Weather App</h1>
            <SearchBox updateInfo = {updateInfo} ></SearchBox>
            <InfoBox infobox={weather}></InfoBox>
        </div>
    )
}