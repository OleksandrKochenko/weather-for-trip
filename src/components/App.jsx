import { useState } from 'react';
import { tripsInitial } from 'data/trips.initial';
import { TripList } from './trip.list';
import { TodayWeather } from './todayWeather';
import { PeriodWeather } from './periodWeather';
import { AddBtn } from './add.btn';
import { Modal } from './modal';
import './styles.css';

export const App = () => {
  const getPersistedTrips = () =>
    JSON.parse(localStorage.getItem('tripList')) ?? tripsInitial;
  const getCurrentTrip = () =>
    JSON.parse(localStorage.getItem('currentTrip')) ?? tripList[0];

  const [tripList, setTripList] = useState(getPersistedTrips);
  //const [sortByDate, setSortByDate] = useState(false);
  //const [filter, setFilter] = useState('');
  const [current, setCurrent] = useState(getCurrentTrip);
  const [modalOpen, setModalOpen] = useState(false);
  //console.log('delete me', setTripList);

  return (
    <div className="home_page">
      <div className="main_section">
        <TripList tripList={tripList} active={current} setActive={setCurrent} />
        <PeriodWeather city={current} />
      </div>
      <AddBtn openModal={() => setModalOpen(true)} />
      <TodayWeather city={current} />
      {modalOpen && (
        <Modal title="Create trip" onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};
