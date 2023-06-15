// Обработка CSS
import '../pages/index.css';

// // Обработка изображений
// const logoImage = new URL('../images/logo/logo.svg', import.meta.url);
// const profileImage = new URL('../images/profile/user_001.png', import.meta.url);
// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: 'Логотип проекта', image: logoImage },
//   { name: 'Аватар пользователя', link: profileImage },
// ];

// Импорт модулей JS
import { container, popupProfile, popupAdd } from './utils.js';
import { openPopup, closePopup } from './modal.js';
import { renderCard } from './card.js';
import { initialCards } from './constants.js';
import { enableValidation, resetError } from './validate.js';

// Поля и кнопки блока Profile
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const buttonOpenEditProfileForm = container.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = container.querySelector('.profile__add-button');

// popup Profile
const formEditProfile = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const formAddCard = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');

// Добавление карточек
initialCards.forEach(renderCard);

// Кнопки на сайте
// Событие по кнопке buttonEdit
buttonOpenEditProfileForm.addEventListener('click', () => {
  formEditProfile.reset();
  resetError(popupProfile, validationSettings);
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

// Событие по кнопке buttonAdd
buttonOpenAddCardForm.addEventListener('click', () => {
  formAddCard.reset();
  resetError(popupAdd, validationSettings);
  openPopup(popupAdd);
});

// Кнопки submit в popup
// Обработка submit в popupProfile
formEditProfile.addEventListener('submit', () => {
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupProfile);
});

// Обработка submit в popupAdd
formAddCard.addEventListener('submit', () => {
  const data = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(data);
  closePopup(popupAdd);
});

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

// Включение валидации
enableValidation(validationSettings);
