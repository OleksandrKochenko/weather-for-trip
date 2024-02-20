import { useState } from 'react';
import { tripsInitial } from 'data/trips.initial';
import { addNewTrip } from 'services/api';
import { TripList } from './trip.list';
import { ListControls } from './list.controls';
import { TodayWeather } from './todayWeather';
import { PeriodWeather } from './periodWeather';
import { Modal } from './modal';
import './styles.css';

export const App = () => {
  const getPersistedTrips = () =>
    JSON.parse(localStorage.getItem('tripList')) ?? tripsInitial;
  const getCurrentTrip = () =>
    JSON.parse(localStorage.getItem('currentTrip')) ?? tripList[0];

  const [tripList, setTripList] = useState(getPersistedTrips);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [current, setCurrent] = useState(getCurrentTrip);
  const [modalOpen, setModalOpen] = useState(false);

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filtredTrips = tripList.filter(trip =>
    trip.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addTrip = data => {
    const newTrip = addNewTrip(data);
    setTripList(list => [...list, newTrip]);
    localStorage.setItem('tripList', JSON.stringify([...tripList, newTrip]));
    setModalOpen(false);
  };

  const sortedTrips =
    sort === '' || sort === 'default'
      ? filtredTrips
      : [...filtredTrips].sort((a, b) => {
          if (a[sort] > b[sort]) {
            return 1;
          }
          if (a[sort] < b[sort]) {
            return -1;
          }
          return 0;
        });

  return (
    <div className="home_page">
      <div className="main_section">
        <h1 className="heading">
          <span className="heading_span">Weather</span> Forecast
        </h1>
        <ListControls
          filterValue={filter}
          onFilterChange={filterChange}
          sortValue={sort}
          onSortChange={setSort}
        />
        <TripList
          tripList={sortedTrips}
          active={current}
          setActive={setCurrent}
          openModal={() => setModalOpen(true)}
        />
        <PeriodWeather city={current} />
      </div>
      <TodayWeather city={current} />
      {modalOpen && (
        <Modal
          title="Create trip"
          onClose={() => setModalOpen(false)}
          onSubmit={addTrip}
        />
      )}
    </div>
  );
};
