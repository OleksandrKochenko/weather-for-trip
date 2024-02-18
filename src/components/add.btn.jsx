import './styles.css';

export const AddBtn = ({ openModal }) => {
  return (
    <div className="add_btn" onClick={openModal}>
      <p className="add_btn_plus">+</p>
      <p>Add trip</p>
    </div>
  );
};
