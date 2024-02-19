import './styles.css';

export const ListControls = ({
  filterValue,
  onFilterChange,
  sortValue,
  onSortChange,
}) => {
  const handleSortChange = event => {
    onSortChange(event.target.value);
  };

  return (
    <div className="list_controls">
      <input
        className="list_filter"
        type="text"
        placeholder="&#128269; Search your trip"
        value={filterValue}
        onChange={onFilterChange}
      />
      <select
        value={sortValue}
        className={`sort_select `}
        name="sort"
        id="sort"
        onChange={handleSortChange}
      >
        <option
          className="sort_option disabled"
          key="disabled"
          disabled
          value=""
        >
          &#8593;&#8595; Sort a list
        </option>

        <option className="sort_option" value="default" key="Default">
          Default
        </option>
        <option className="sort_option" value="name" key="City">
          City
        </option>
        <option className="sort_option" value="date_start" key="Date">
          Date
        </option>
      </select>
    </div>
  );
};
