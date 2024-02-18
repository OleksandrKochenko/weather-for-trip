import { useEffect, useState } from 'react';
import { fetchPeriodForecast } from 'services/api';
import { weatherIcons } from 'data/weather.icons';
import './styles.css';

export const PeriodWeather = ({ city }) => {
  const [periodForecast, setPeriodForecast] = useState(null);

  useEffect(() => {
    const { name, iso2, date_start, date_end } = city;

    async function fetchData() {
      const { days } = await fetchPeriodForecast({
        name,
        iso2,
        date_start,
        date_end,
      });
      const forecast = days.map(el => {
        const { datetime, tempmax, tempmin, icon } = el;
        const dayname = new Date(datetime.replace('-', '.')).toLocaleDateString(
          'en-EN',
          { weekday: 'long' }
        );
        return { datetime, tempmax, tempmin, icon, dayname };
      });
      setPeriodForecast(forecast);
    }
    setTimeout(fetchData);
  }, [city]);

  return (
    <div>
      <h3 className="forecast_title">Week</h3>
      {periodForecast && (
        <ul className="forecast_list">
          {periodForecast.map((day, idx) => (
            <li className="forecast_item" key={idx}>
              <p className="forecast_dayname">{day.dayname}</p>
              <img
                className="forecast_icon"
                src={weatherIcons[day.icon]}
                alt={day.icon}
              />
              <p>
                {Math.round(+day.tempmax)}°/{Math.round(+day.tempmin)}°
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
