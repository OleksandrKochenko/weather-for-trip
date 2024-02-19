import { TripItem } from './trip.item';
import './styles.css';
import { AddBtn } from './add.btn';

export const TripList = ({ tripList, active, setActive, openModal }) => {
  const persistCurrentTrip = item =>
    localStorage.setItem('currentTrip', JSON.stringify(item));

  return (
    <div className="trip_list_wraper">
      <ul className="trip_list">
        {tripList.map(trip => (
          <TripItem
            key={trip.id}
            trip={trip}
            active={active.id}
            onClick={() => {
              setActive(trip);
              persistCurrentTrip(trip);
            }}
          />
        ))}
      </ul>
      <AddBtn openModal={openModal} />
    </div>
  );
};
