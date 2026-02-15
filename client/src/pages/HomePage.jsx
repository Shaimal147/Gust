import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getCurrentWeather, getHourlyWeather } from "../utils/weatherapi";
import { fetchDailyWeather } from "../utils/weatherapi";
import { pickRandomMessage } from "./genericMessages";
import { getGeoCode } from "../utils/geocodeapi";
import UnitOption from "../components/UnitOption";
import styles from "./HomePage.module.css";
import gustLogo from "/images/gust-logo.png";
import gearIcon from "/images/icon-units.svg";
import searchIcon from "/images/icon-search.svg";
import loadingIcon from "../assets/icon-loading.svg";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isMetric, setIsMetric] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [searchText, setSearchText] = useState("");
  const [geoCandidates, setGeoCandidates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null) 
  const [genericMessage] = useState(pickRandomMessage());
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const currentData = isMetric
    ? {
        temperature: currentWeather?.temperature,
        feelsLike: currentWeather?.feelsLike,
        speed: `${currentWeather?.windSpeed} km/h`,
        height: `${currentWeather?.precipitation} mm`,
        weatherCode: currentWeather?.weather,
        time: currentWeather?.time,
      }
    : {
        temperature: (currentWeather?.temperature * 1.8 + 32).toFixed(1),
        feelsLike: (currentWeather?.feelsLike * 1.8 + 32).toFixed(1),
        speed: `${(currentWeather?.windSpeed * 0.621371).toFixed(0)} mph`,
        height: `${(currentWeather?.precipitation / 25.4).toFixed(0)} in`,
        weatherCode: currentWeather?.weather,
        time: currentWeather?.time,
      };
  const dailyData = (dailyWeather ?? []).map((day) => {
    const minTemperature = isMetric
      ? day.minTemp
      : (day.minTemp * 1.8 + 32).toFixed(1);
    const maxTemperature = isMetric
      ? day.maxTemp
      : (day.maxTemp * 1.8 + 32).toFixed(1);

    return {
      ...day,
      minTemperature,
      maxTemperature,
    };
  });
  const hourlyData = (hourlyWeather ?? []).map((hour) => {
    const temperature = isMetric
      ? hour.hourlyTemp
      : (hour.hourlyTemp * 1.8 + 32).toFixed(1);

    return {
      ...hour,
      temperature,
    };
  });
  const dropdownSelect = "/images/icon-checkmark.svg";
  const hoursForSelectedDay = hourlyData.filter((h) => {
    return h.day === selectedDay;
  });

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true)
        const currentData = await getCurrentWeather(52.52, 13.41);
        const dailyData = await fetchDailyWeather(52.52, 13.41);
        const hourlyData = await getHourlyWeather(52.52, 13.41);

        setCurrentWeather(currentData);
        setDailyWeather(dailyData);
        setHourlyWeather(hourlyData);
        setSelectedDay(dayjs(currentData.time).format("dddd"));

        setLoading(false);
      } catch (error) {
        console.log("Failed to load data: ", error);
      }
    }

    loadWeather();
  }, []);

  function toggleUnits() {
    setIsMetric((prev) => !prev);
  }

  async function sendQuery() {
    if (!searchText.trim()) return;
    const response = await getGeoCode(searchText);
    setGeoCandidates(response);
  }

  async function getLocationWeather(place) {
    setSelectedLocation(place)
    setGeoCandidates([])
    setSearchText("")

    setLoading(true)
    const {latitude, longitude} = place
    const current = await getCurrentWeather(latitude, longitude)
    const daily = await fetchDailyWeather(latitude, longitude)
    const hourly = await getHourlyWeather(latitude, longitude)

    setCurrentWeather(current)
    setDailyWeather(daily)
    setHourlyWeather(hourly)
    setLoading(false)
  }

  return (
    <>
      {/* Header section */}
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="d-flex align-items-center gap-1  py-3 py-lg-5">
              <img src={gustLogo} alt="gust logo" width={30} />
              <p className="mb-0">Gust</p>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-end py-3 py-lg-5">
              <div className="btn-group">
                <button
                  className={`btn ${styles.button1} btn-sm dropdown-toggle`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={gearIcon} alt="unit settings icon" /> Units
                </button>
                <ul
                  className={`dropdown-menu ${styles.dropdownContainer} mt-1 p-2`}
                >
                  <li>
                    <button
                      className={`btn ${styles.button1} btn-sm w-100 text-start`}
                      onClick={toggleUnits}
                    >
                      {isMetric ? "Switch to Imperial" : "Switch to Metric"}
                    </button>
                  </li>
                  <li>
                    <p className="px-2 mb-0 mt-2" style={{ fontSize: "small" }}>
                      Temperature
                    </p>
                  </li>
                  <UnitOption
                    label={
                      <>
                        Celsius ( <sup>°</sup>C )
                      </>
                    }
                    selected={isMetric}
                    onClick={() => setIsMetric(true)}
                    iconSrc={dropdownSelect}
                  />
                  <UnitOption
                    label={
                      <>
                        Fahrenheit ( <sup>°</sup>F )
                      </>
                    }
                    selected={!isMetric}
                    onClick={() => setIsMetric(false)}
                    iconSrc={dropdownSelect}
                    divider
                  />
                  <li>
                    <p className="px-2 mb-0 mt-2" style={{ fontSize: "small" }}>
                      Wind Speed
                    </p>
                  </li>
                  <UnitOption
                    label={"km/h"}
                    selected={isMetric}
                    onClick={() => setIsMetric(true)}
                    iconSrc={dropdownSelect}
                  />
                  <UnitOption
                    label={"mph"}
                    selected={!isMetric}
                    onClick={() => setIsMetric(false)}
                    iconSrc={dropdownSelect}
                    divider
                  />
                  <li>
                    <p className="px-2 mb-0 mt-2" style={{ fontSize: "small" }}>
                      Precipitation
                    </p>
                  </li>
                  <UnitOption
                    label={"mm"}
                    selected={isMetric}
                    onClick={() => setIsMetric(true)}
                    iconSrc={dropdownSelect}
                  />
                  <UnitOption
                    label={"in"}
                    selected={!isMetric}
                    onClick={() => setIsMetric(false)}
                    iconSrc={dropdownSelect}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className={`d-flex justify-content-center align-items-center py-2 ${styles["generic-message"]}`}
            >
              {genericMessage}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3 mt-lg-5">
        <div className="mx-auto" style={{ maxWidth: "680px" }}>
          <div className="d-flex flex-column flex-lg-row gap-3 align-items-stretch">
            <form className="flex-lg-grow-1 w-100" action="">
              <div className={`input-group ${styles.searchbar}`}>
                <span className={`input-group-text ${styles.searchIconWrap}`}>
                  <img src={searchIcon} alt="search icon" width={18} />
                </span>
                <input
                  type="text"
                  className={`form-control ${styles.searchInput}`}
                  placeholder="Search for a place..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </form>
            <button
              type="button"
              className={`btn ${styles.button2} w-100`}
              style={{ flexBasis: "20%" }}
              onClick={sendQuery}
            >
              Search
            </button>
          </div>
          {geoCandidates.length > 0 ?
            geoCandidates.map((place) => {
              return (
                <div
                  className={`card  ${styles["overview-details"]} w-100 h-100 mt-2`}
                  key={place.id}
                >
                  <div className="card-body">
                    <button
                      type="button"
                      onClick={() => getLocationWeather(place)}
                      className={`btn ${styles.button1} d-flex justify-content-between btn-sm w-100 text-start`}
                    >
                      {place.label}
                    </button>
                  </div>
                </div>
              )
            })
          :
            <></>
          }
        </div>
      </div>

      <div className="container mt-3 mt-lg-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column h-100">
              <div className="mt-0">
                <div className="row">
                  <div className="col-12">
                    {!loading ? (
                      <div
                        className={`d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between ${styles.overview} ${styles.overviewWidth} px-lg-3 py-lg-5`}
                      >
                        <div>
                          <p className={`${styles["overview-title"]}`}>
                            {selectedLocation?.label}
                          </p>
                          <p className={`${styles["overview-text"]}`}>
                            {currentData.time}
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                          <img
                            src={currentData.weatherCode?.icon}
                            alt={currentData.weatherCode?.label}
                            width={80}
                          />
                          <p className="mb-0">
                            {currentData.temperature}
                            <sup>°</sup>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`d-flex flex-column justify-content-center align-items-center ${styles.overviewWidth}  ${styles.loadingOverview} px-lg-3 py-lg-5`}
                      >
                        <img src={loadingIcon} alt={null} width={30} />
                        Loading
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 mt-lg-5">
                <div className={`row g-4 ${styles.overviewWidth}`}>
                  <div className="col-6 col-lg-3">
                    <div
                      className={`card  ${styles["overview-details"]} w-100 h-100`}
                    >
                      <div className="card-body">
                        <p className="card-text">Feels like</p>
                        {!loading ? (
                          <h5 className="card-title">
                            {currentData.feelsLike}
                            <sup>°</sup>
                          </h5>
                        ) : (
                          <h5 className="card-title">&mdash;</h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div
                      className={`card  ${styles["overview-details"]} w-100 h-100`}
                    >
                      <div className="card-body">
                        <p className="card-text">Humidity</p>
                        {!loading ? (
                          <h5 className="card-title">
                            {currentWeather?.humidity}%
                          </h5>
                        ) : (
                          <h5 className="card-title">&mdash;</h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div
                      className={`card  ${styles["overview-details"]} w-100 h-100`}
                    >
                      <div className="card-body">
                        <p className="card-text">Wind</p>
                        {!loading ? (
                          <h5 className="card-title">{currentData.speed}</h5>
                        ) : (
                          <h5 className="card-title">&mdash;</h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div
                      className={`card  ${styles["overview-details"]} w-100 h-100`}
                    >
                      <div className="card-body">
                        <p
                          className="card-text text-nowrap"
                          style={{ fontSize: "small" }}
                        >
                          Precipitation
                        </p>
                        {!loading ? (
                          <h5 className="card-title">{currentData.height}</h5>
                        ) : (
                          <h5 className="card-title">&mdash;</h5>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 mt-lg-4">
                <div className="col-12">
                  <div className="">Daily forecast</div>
                </div>
              </div>
              {!loading ? (
                <div
                  className={`row g-3 mt-1 mt-lg-4 ${styles.forecastRow} ${styles.overviewWidth}`}
                >
                  {dailyData.map((day) => {
                    return (
                      <div className="col-4 col-lg" key={day.date}>
                        <div
                          className={`card  ${styles["overview-details"]} h-100 w-100`}
                        >
                          <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                            <div className="d-flex flex-column align-items-center">
                              <p
                                className="card-text m-0"
                                style={{ fontSize: "small" }}
                              >
                                {day.date}
                              </p>
                              <img
                                src={day.weatherCode?.icon}
                                alt={day.weatherCode?.label}
                                width={50}
                              />
                            </div>
                            <div className="d-flex justify-content-between w-100 px-1">
                              <p className="mb-0">
                                {day.minTemperature}
                                <sup>°</sup>
                              </p>
                              <p className="mb-0">
                                {day.maxTemperature}
                                <sup>°</sup>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`row g-3 mt-1 mt-lg-4 ${styles.forecastRow} ${styles.overviewWidth}`}
                >
                  <div className="col-4 col-lg">
                    <div
                      className={`card  ${styles["overview-details"]} h-100 w-100`}
                    >
                      <div className="card-body d-flex flex-column justify-content-start align-items-center h-100 w-100 py-1 px-0">
                        <div className="d-flex flex-column align-items-center">
                          <p
                            className="card-text m-0"
                            style={{ fontSize: "small" }}
                          >
                            &mdash;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className={styles.hourlySidebar}>
              <div className="row">
                <div className="col-12">
                  <div className={`card ${styles["hourly-details"]} w-100`}>
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <p className={`${styles["hourly-details"]} mb-0`}>
                        Hourly forecast
                      </p>
                      <div className="btn-group">
                        <button
                          className={`btn ${styles.button3} btn-sm dropdown-toggle`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {selectedDay}
                        </button>
                        <ul
                          className={`dropdown-menu ${styles.dropdownContainer} mt-1 p-2`}
                        >
                          {days.map((day) => {
                            const isSelected = day === selectedDay;

                            return (
                              <li key={day}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedDay(day)}
                                  className={`btn ${styles.button1} d-flex justify-content-between btn-sm w-100 text-start ${
                                    isSelected ? styles.active : ""
                                  }`}
                                  aria-pressed={isSelected}
                                >
                                  <span>{day}</span>
                                  {isSelected && (
                                    <img
                                      src="/images/icon-checkmark.svg"
                                      alt="selected"
                                      width={20}
                                    />
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {hoursForSelectedDay.map((hour) => {
                  return (
                    <div className="col-12" key={hour.date}>
                      <div
                        className={`card  ${styles["overview-details"]} mt-3 w-100`}
                      >
                        <div className="card-body">
                          <div
                            className={`${styles["hourly-details-2"]} d-flex align-items-center justify-content-between`}
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={hour.hourlyWeatherCode.icon}
                                alt={hour.hourlyWeatherCode.icon}
                                width={50}
                              />
                              <p className="card-text m-0">{hour.hour}</p>
                            </div>
                            <p className="m-0">
                              {hour.temperature}
                              <sup>°</sup>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
