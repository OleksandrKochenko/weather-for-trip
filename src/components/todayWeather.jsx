import { useEffect, useState } from 'react';
import { fetchDayForecast } from 'services/api';
import { weatherIconsInverted } from 'data/weather.icons';
import './styles.css';

export const TodayWeather = ({ city }) => {
  const [dayForecast, setDayForecast] = useState(null);

  useEffect(() => {
    const { name, iso2 } = city;

    async function fetchData() {
      const { days } = await fetchDayForecast({ name, iso2 });
      setDayForecast({
        temp: days[0].temp,
        icon: days[0].icon,
        today: new Date().toLocaleDateString('en-EN', { weekday: 'long' }),
      });
    }
    setTimeout(fetchData);
  }, [city]);

  return (
    <div className="day_weather_section">
      <div className="day_weather">
        {dayForecast && (
          <>
            <p className="day_name">{dayForecast.today}</p>
            <p className="weather_data">
              <img
                className="day_forecast_icon"
                src={weatherIconsInverted[dayForecast.icon]}
                alt={dayForecast.icon}
              />
              <span className="weather_temp">
                {Math.round(+dayForecast.temp)}
              </span>
              <span className="celsius">°C</span>
            </p>
          </>
        )}
        <p className="weather_city_name">{city.name}</p>
      </div>
    </div>
  );
};
