import axios from 'axios';

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
