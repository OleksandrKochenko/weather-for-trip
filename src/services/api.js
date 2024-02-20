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
  const dayInMs = 86400000;
  const weekInMs = dayInMs * 7;
  const startAsDate = new Date(date_start.replace('-', '.'));
  const endAsDate = new Date(date_end.replace('-', '.'));
  const tripPeriodInMs = endAsDate - startAsDate;
  const endOfWeek = new Date(
    startAsDate.getTime() + weekInMs
  ).toLocaleDateString('en-CA');
  const res = await axios.get(
    `${name},${iso2}/${date_start}/${
      tripPeriodInMs > weekInMs ? endOfWeek : date_end
    }/`
  );
  return res.data;
};

export const addNewTrip = data => {
  const cityIdx = cities.findIndex(el => el.id === data.selected);
  const date_start = data.dateStart.toLocaleDateString('en-CA');
  const date_end = data.dateEnd.toLocaleDateString('en-CA');

  const newTrip = {
    name: cities[cityIdx].name,
    id:
      cities[cityIdx].id +
      '_' +
      Math.floor(Math.random() * 0xffffff).toString(16),
    iso2: cities[cityIdx].iso2,
    img: cities[cityIdx].img,
    date_start,
    date_end,
  };

  return newTrip;
};
