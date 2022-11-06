import "./Popup.css";
import iconSad from "../../images/unsuccessful.svg";
import iconHappy from "../../images/successful.svg";

const Popup = ({ isOpen, onClose, isSuccessful, popupMessageText }) => {
  return (
    <div className={`popup ${isOpen ? "popup_show" : ""}`}>
      <div className="popup__container">
        <img
          src={isSuccessful ? iconHappy : iconSad}
          alt={`${isSuccessful ? "Весёлый эмоджи" : "Грустный эмоджи"}`}
          className="popup__img"
        />
        <p className="popup__message">{popupMessageText}</p>
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
