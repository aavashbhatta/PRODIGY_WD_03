import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
const api = {
  key: "ec65eefac78a783c4cd72d776c6c39d8",
  base: "https://api.openweathermap.org/data/2.5",
};
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [autoLocation, setAutoLocation] = useState(false);

  useEffect(() => {
    if (autoLocation) {
      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `${api.base}/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
          )
            .then((res) => res.json())
            .then((result) => {
              setWeather(result);
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setAutoLocation(false);
        }
      );
    }
  }, [autoLocation]);

  const searchPressed = () => {
    if (search) {
      setAutoLocation(false);
      fetch(`${api.base}/weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    }
  };

  const autoDetectLocation = () => {
    setAutoLocation(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Header */}
        <h1>WEATHER APP</h1>
        {/* Search Box */}
        <div className="Box">
          <input
            type="text"
            placeholder="Enter city/town"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        <div className="Auto">
          <button onClick={autoDetectLocation}>Auto Detect Location</button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="Results">
            {/* Location */}
            <p>
              {weather.name}, {weather.sys.country}
            </p>
            {/* Temperature */}
            <p>{weather.main.temp}*C</p>
            {/* Condition */}
            <p>{weather.weather[0].main}</p>
            {/* Capitalize the weather description */}
            <p style={{ textTransform: "capitalize" }}>
              {weather.weather[0].description}
            </p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
