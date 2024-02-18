import axios from 'axios';
import { cities } from 'data/cities';

export const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;
export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  unitGroup: 'metric',
  iconSet: 'icons1',
  include: 'days',
};

export const fetchDayForecast = async query => {
  const { name, iso2 } = query;
  const res = await axios.get(`${name},${iso2}/today/`);
  return res.data;
};

export const fetchPeriodForecast = async query => {
  const { name, iso2, date_start, date_end } = query;
  const res = await axios.get(`${name},${iso2}/${date_start}/${date_end}/`);
  return res.data;
};

export const addNewTrip = data => {
  const cityIdx = cities.findIndex(el => el.id === data.selected);
  const date_start = data.dateStart.toISOString();
  const date_end = data.dateEnd.toISOString();

  const newTrip = {
    name: cities[cityIdx].name,
    id:
      cities[cityIdx].id +
      '_' +
      Math.floor(Math.random() * 0xffffff).toString(16),
    iso2: cities[cityIdx].iso2,
    img: cities[cityIdx].img,
    date_start: date_start.slice(0, date_start.indexOf('T')),
    date_end: date_end.slice(0, date_start.indexOf('T')),
  };

  return newTrip;
};
