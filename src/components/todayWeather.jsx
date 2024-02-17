import { weatherIconsInverted } from 'data/weather.icons';
import './styles.css';

export const TodayWeather = ({ city, forecast }) => {
  return (
    <div className="day_weather_section">
      <div className="day_weather">
        {forecast && (
          <>
            <p className="day_name">{forecast.today}</p>
            <p className="weather_data">
              <img
                className="day_forecast_icon"
                src={weatherIconsInverted[forecast.icon]}
                alt={forecast.icon}
              />
              <span className="weather_temp">{Math.round(+forecast.temp)}</span>
              <span className="celsius">°C</span>
            </p>
            <p className="weather_city_name">{city.name}</p>
          </>
        )}
      </div>
    </div>
  );
};
