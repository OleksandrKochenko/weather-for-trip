import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { cities } from 'data/cities';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

export const NewTripForm = ({ onSubmit, onClose }) => {
  const [selected, setSelected] = useState('');
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setdateEnd] = useState(null);

  const handleChange = event => {
    setSelected(event.target.value);
  };

  return (
    <>
      <form className="form">
        <div className="form_field">
          <label className="form_label" htmlFor="city">
            <span className="required_sign">*</span> City
          </label>
          <select
            value={selected}
            className={`form_select ${selected === '' && 'disabled'}`}
            name="city"
            id="city"
            onChange={handleChange}
          >
            <option
              className="form_option disabled"
              key={'default'}
              disabled
              value=""
            >
              Please select a city
            </option>
            {cities.map(city => (
              <option className="form_option" value={city.id} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form_field">
          <label className="form_label" htmlFor="date_start">
            <span className="required_sign">*</span> Start date
          </label>
          <DatePicker
            placeholderText="Select date"
            dateFormat="YYYY-MM-d"
            selected={dateStart}
            selectsStart
            startDate={dateStart}
            endDate={dateEnd}
            minDate={new Date()}
            onChange={date => setDateStart(date)}
            className="date_picker"
          />
        </div>
        <div className="form_field">
          <label className="form_label" htmlFor="date_end">
            <span className="required_sign">*</span> End date
          </label>
          <DatePicker
            placeholderText="Select date"
            dateFormat="YYYY-MM-d"
            selected={dateEnd}
            selectsEnd
            startDate={dateStart}
            endDate={dateEnd}
            minDate={dateStart || new Date()}
            onChange={date => setdateEnd(date)}
            className="date_picker"
          />
        </div>
      </form>
      <div className="modal_controls">
        <button className="cancel_btn" type="button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="save_btn"
          type="button"
          onClick={() => onSubmit({ selected, dateStart, dateEnd })}
        >
          Save
        </button>
      </div>
    </>
  );
};
