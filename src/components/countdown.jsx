import { useEffect, useState } from 'react';
import { getRemainingTime } from 'services/count';
import './styles.css';

export const Countdown = ({ date }) => {
  const dateStart = new Date(date.replace('-', '.')).getTime();
  const dateToday = new Date().getTime();

  const [remainingTime, setRemainingTime] = useState(
    getRemainingTime(dateStart, dateToday)
  );

  useEffect(() => {
    setRemainingTime(getRemainingTime(dateStart, dateToday));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime(dateStart, dateToday));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  return (
    <div className="countdown">
      {remainingTime ? (
        <>
          <p className="countdown_item">
            <span className="countdown_item_value">{remainingTime.days}</span>
            <span className="countdown_item_name">DAYS</span>
          </p>
          <p className="countdown_item">
            <span className="countdown_item_value">{remainingTime.hours}</span>
            <span className="countdown_item_name">HOURS</span>
          </p>
          <p className="countdown_item">
            <span className="countdown_item_value">
              {remainingTime.minutes}
            </span>
            <span className="countdown_item_name">MINUTES</span>
          </p>
          <p className="countdown_item">
            <span className="countdown_item_value">
              {remainingTime.seconds}
            </span>
            <span className="countdown_item_name">SECONDS</span>
          </p>
        </>
      ) : (
        <p className="message_expired">Your trip has expired</p>
      )}
    </div>
  );
};
