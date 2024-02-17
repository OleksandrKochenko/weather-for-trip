import { useEffect, useState } from 'react';
import { fetchDayForecast } from 'services/api';
import { tripsInitial } from 'data/trips.initial';
import { TripList } from './trip.list';
import { TodayWeather } from './todayWeather';
import './styles.css';

export const App = () => {
  const getPersistedTrips = () =>
    JSON.parse(localStorage.getItem('tripList')) ?? tripsInitial;
  const getCurrentTrip = () =>
    JSON.parse(localStorage.getItem('currentTrip')) ?? tripList[0];

  const [tripList, setTripList] = useState(getPersistedTrips);
  const [sortByDate, setSortByDate] = useState(false);
  const [filter, setFilter] = useState('');
  const [active, setActive] = useState(getCurrentTrip);
  const [dayForecast, setDayForecast] = useState(null);

  useEffect(() => {
    const { name, iso2 } = active;

    async function fetchData() {
      const { days } = await fetchDayForecast({ name, iso2 });
      setDayForecast({
        temp: days[0].temp,
        icon: days[0].icon,
        today: new Date().toLocaleDateString('en-EN', { weekday: 'long' }),
      });
    }
    setTimeout(fetchData);
  }, [active]);

  return (
    <div className="home_page">
      <div className="main_section">
        <TripList tripList={tripList} active={active} setActive={setActive} />
      </div>
      <TodayWeather city={active} forecast={dayForecast} />
    </div>
  );
};
