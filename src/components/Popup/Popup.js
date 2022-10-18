import React from "react";
import "./Popup.css";
import iconSad from "../../images/unsuccessful.svg";

const Popup = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? "popup_show" : ""}`}>
      <div className="popup__container">
        <img src={iconSad} alt="Грустный эмоджи" className="popup__img" />
        <p className="popup__message">
          Здесь будет сообщение об ошибке Здесь будет сообщение об ошибке Здесь
          будет сообщение об ошибке Здесь будет сообщение об ошибке
        </p>
        <button type="button" className="popup__close-btn" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
