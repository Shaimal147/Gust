import axios from 'axios'
import dayjs from 'dayjs'
import sunnyIcon from '../assets/icon-sunny.webp'
import stormIcon from '../assets/icon-storm.webp'
import snowIcon from '../assets/icon-snow.webp'
import rainIcon from '../assets/icon-rain.webp'
import cloudIcon from '../assets/icon-partly-cloudy.webp'
import overcastIcon from '../assets/icon-overcast.webp'
import fogIcon from '../assets/icon-fog.webp'
import drizzleIcon from '../assets/icon-drizzle.webp'

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

 function mapWeatherCode(code) {
    const weatherCodeMap = {
        0: {
            type: "clear",
            label: "Clear sky",
            icon: sunnyIcon
        },
        1: {
            type: "clear",
            label: "Mainly clear",
            icon: sunnyIcon
        },
        2: {
            type: "clear",
            label: "Partly cloudy",
            icon: cloudIcon
        },
        3: {
            type: "clear",
            label: "Overcast",
            icon: overcastIcon
        },
        45: {
            type: "fog",
            label: "Fog",
            icon: fogIcon
        },
        48: {
            type: "fog",
            label: "Rime fog",
            icon: fogIcon
        },
        51: {
            type: "drizzle",
            label: "Light drizzle",
            icon: drizzleIcon
        },
        53: {
            type: "drizzle",
            label: "Moderate drizzle",
            icon: drizzleIcon
        },
        55: {
            type: "drizzle",
            label: "Dense drizzle",
            icon: drizzleIcon
        },
        56: {
            type: "drizzle",
            label: "Light freezing drizzle",
            icon: drizzleIcon
        },
        57: {
            type: "drizzle",
            label: "Dense freezing drizzle",
            icon: drizzleIcon
        },
        61: {
            type: "rain",
            label: "Slight rain",
            icon: rainIcon
        },
        63: {
            type: "rain",
            label: "Moderate rain",
            icon: rainIcon
        },
        65: {
            type: "rain",
            label: "Heavy rain",
            icon: rainIcon
        },
        66: {
            type: "rain",
            label: "Light freezing rain",
            icon: rainIcon
        },
        67: {
            type: "rain",
            label: "Heavy freezing rain",
            icon: rainIcon
        },
        71: {
            type: "snow",
            label: "Slight snow",
            icon: snowIcon
        },
        73: {
            type: "snow",
            label: "Moderate snow",
            icon: snowIcon
        },
        75: {
            type: "snow",
            label: "Heavy snow",
            icon: snowIcon
        },
        77: {
            type: "snow",
            label: "Snow grains",
            icon: snowIcon
        },
        80: {
            type: "rain",
            label: "Light rain showers",
            icon: rainIcon
        },
        81: {
            type: "rain",
            label: "Moderate rain showers",
            icon: rainIcon
        },
        82: {
            type: "rain",
            label: "Violent rain showers",
            icon: rainIcon
        },
        95: {
            type: "thunderstorm",
            label: "Slight or moderate",
            icon: stormIcon
        },
        96: {
            type: "thunderstorm",
            label: "Thunderstorm with slight and heavy hail",
            icon: stormIcon
        }
    }

    return weatherCodeMap[code] || {
            type: "unknown",
            label: "unknown",
            icon: null
        }
 }

 function longDateFormatter(date) {
    return dayjs(date).format('dddd, MMMM D, YYYY')
 }


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
            date: dayjs(date).format("ddd"),
            maxTemp: data.daily.temperature_2m_max[index],
            minTemp: data.daily.temperature_2m_min[index],
            weatherCode: mapWeatherCode(data.daily.weather_code[index]) 
        })); 
    
    return shaped;
}

export async function getCurrentWeather(latitude, longitude){
    const response = await axios.get(BASE_URL, {
        params: {
            latitude,
            longitude,
            current: ["temperature_2m", "weather_code", "apparent_temperature", "wind_speed_10m", "precipitation", "relative_humidity_2m"]
        }
    })
    const data = response.data

    const shaped = {
        temperature: data.current.temperature_2m,
        weather: mapWeatherCode(data.current.weather_code),
        feelsLike: data.current.apparent_temperature,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        humidity: data.current.relative_humidity_2m,
        time: longDateFormatter(data.current.time)
    }
    return shaped
}

export  async function getHourlyWeather(latitude, longitude) {
    const response = await axios.get(BASE_URL, {
        params: {
            latitude,
            longitude,
            hourly: ["temperature_2m", "weather_code"]
        }
    })
    const data = response.data

    const shaped = data.hourly.time.map((time, index) => ({
        date: time,
        day: dayjs(time).format('dddd'),
        hour: dayjs(time).format('h A'),
        hourlyTemp: data.hourly.temperature_2m[index],
        hourlyWeatherCode: mapWeatherCode(data.hourly.weather_code[index])
    }))

    return shaped
}