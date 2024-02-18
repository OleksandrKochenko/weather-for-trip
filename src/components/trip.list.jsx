import { TripItem } from './trip.item';
import './styles.css';

export const TripList = ({ tripList, active, setActive }) => {
  const persistCurrentTrip = item =>
    localStorage.setItem('currentTrip', JSON.stringify(item));

  return (
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
  );
};