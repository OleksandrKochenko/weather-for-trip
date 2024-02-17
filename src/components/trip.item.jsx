import './styles.css';

export const TripItem = ({ trip, active, onClick }) => {
  const dateStartConverted = trip.date_start.split('-').reverse().join('.');
  const dateEndConverted = trip.date_end.split('-').reverse().join('.');

  return (
    <li
      className={`trip_item ${active === trip.id && 'active'}`}
      key={trip.id}
      onClick={onClick}
    >
      <img className="city_image" src={trip.img} alt={trip.name} />
      <p className="city_name">{trip.name}</p>
      <p className="city_period">
        {dateStartConverted} - {dateEndConverted}
      </p>
    </li>
  );
};
