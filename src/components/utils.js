export const container = document.querySelector('.page');
export const popupProfile = container.querySelector('.popup_profile');
export const popupAdd = container.querySelector('.popup_add');

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};


