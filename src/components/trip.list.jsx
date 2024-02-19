import { useRef } from 'react';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import { useIsOverflow } from 'services/hook';
import { TripItem } from './trip.item';
import { AddBtn } from './add.btn';
import './styles.css';

export const TripList = ({ tripList, active, setActive, openModal }) => {
  const elementRef = useRef();
  const isOverflow = useIsOverflow(elementRef);

  function handleScroll(element, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= 1000) {
        clearInterval(slideTimer);
      }
    }, 25);
  }

  const persistCurrentTrip = item =>
    localStorage.setItem('currentTrip', JSON.stringify(item));

  return (
    <div className="trip_list_wraper">
      <div className="scroll_wraper">
        <ul className="trip_list" ref={elementRef}>
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
        {isOverflow && (
          <button
            className="scroll_btn left"
            onClick={() => {
              handleScroll(elementRef.current, -200);
            }}
          >
            <ChevronsLeft />
          </button>
        )}
        {isOverflow && (
          <button
            className="scroll_btn right"
            onClick={() => {
              handleScroll(elementRef.current, 200);
            }}
          >
            <ChevronsRight />
          </button>
        )}
      </div>
      <AddBtn openModal={openModal} />
    </div>
  );
};
