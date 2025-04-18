import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'API Key'; // replace it with your api key, refer readme file for more info

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found!');
    }
  };

  return (
    <div className="app" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '1rem' }}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
