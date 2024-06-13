import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){

    let [city, setCity] = useState("");
    let [error,setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "e0e588af3623a9e8a9f9878e8cd1c9fe";

    let handleInputChange = (event) =>{
        setCity(event.target.value);
    };

    
    let weatherForecast = async() => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city : city,
                temp : jsonResponse.main.temp,
                humidity : jsonResponse.main.humidity,
                description : jsonResponse.weather[0].description,
                max_temp : jsonResponse.main.temp_max,
                min_temp : jsonResponse.main.temp_min,
                feelsLike : jsonResponse.main.feels_like,
            }
            console.log(result)
            return result;

        }catch(err){
            throw err;
        }
        
    }
    
    let handleSubmit = async(event) => {
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            setError(false)
            let newInfo = await weatherForecast();
            updateInfo(newInfo);

        }
        catch(err){
            setError(true);
        }
    };
    return(
        <div className="SearchBox"> 
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City name" variant="outlined" onChange={handleInputChange} value={city} required/>
            <br /><br />
            <Button variant="contained" type='submit'>
        Send
      </Button>
            </form>
            {error && <p>This place does not exists</p>}
        </div>
    )
}