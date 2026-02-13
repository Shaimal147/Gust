import axios from 'axios'

const BASE_URL = "https://api.open-meteo.com/v1/forecast"


 export async function fetchDailyWeather(latitude, longitude) {
    const response =  await axios.get(BASE_URL, {
        params: {
            latitude,
            longitude,
            daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
            timezone: "auto"
        }
    })
    const data = response.data

    const shaped = data.daily.time.map((date, index) => ({
            date,
            maxTemp: data.daily.temperature_2m_max[index],
            minTemp: data.daily.temperature_2m_min[index],
            weatherCode: data.daily.weather_code[index] 
        })); 
        
    return shaped;
}

console.log(await fetchDailyWeather(52.52, 13.41))