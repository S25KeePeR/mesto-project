import { container } from "./utils.js";

// Popup
// Функция открытия popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnPressKey);
  popup.addEventListener('click', closePopupOnClickOverlay);
}

// Функция закрытия popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnPressKey);
  popup.removeEventListener('click', closePopupOnClickOverlay);
}

// Нажатие на кнопку ESC
const closePopupOnPressKey = (e) => {
  if (e.key === 'Escape') {
    const popupOpen = container.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

// Клик на overlay
const closePopupOnClickOverlay = (e) => {
  const targetOverlay = e.target.classList.contains('popup');
  const targetBtnClose = e.target.classList.contains('popup__close-btn');
  if (targetOverlay || targetBtnClose) {
    closePopup(e.currentTarget);
  }
}

export { openPopup, closePopup };
