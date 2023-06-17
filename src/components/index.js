// Обработка CSS
import '../pages/index.css';

// Импорт модулей JS
import { container, popupProfile, profileId, popupAdd, popupAvatar } from './utils.js';
import { openPopup, closePopup } from './modal.js';
import { renderCard } from './card.js';
import { enableValidation, resetError } from './validate.js';
import { getProfileInfo, getInitialCards, postProfileInfo, postNewCards, postProfileAvatar } from './api.js';

// Профиль пользователя
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const profileAvatar = container.querySelector('.profile__avatar');

// Кнопки на сайте
const buttonOpenEditAvatarForm = container.querySelector('.profile__avatar-button');
const buttonOpenEditProfileForm = container.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = container.querySelector('.profile__add-button');

// popup Avatar
const formEditAvatar = popupAvatar.querySelector('.popup__form');
const popupInputLinkAvatar = popupAvatar.querySelector('.popup__input_type_link');
const popupButtonAvatar = popupAvatar.querySelector('.popup__submit-btn');

// popup Profile
const formEditProfile = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');
const popupButtonProfile = popupProfile.querySelector('.popup__submit-btn');

// popup Add
const formAddCard = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');
const popupButtonCard = popupAdd.querySelector('.popup__submit-btn');



getProfileInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
    profileId.dataset.userId = result._id;
  })
  .catch((err) => {
    console.log(err);
  });

// Добавление карточек
getInitialCards()
  .then((result) => {
    result.reverse().forEach(renderCard);
  })
  .catch((err) => {
    console.log(err);
  });

// Кнопки на сайте
// Событие по кнопке buttonAvatar
buttonOpenEditAvatarForm.addEventListener('click', () => {
  formEditAvatar.reset();
  resetError(popupAvatar, validationSettings);
  openPopup(popupAvatar);
  popupInputLinkAvatar.value = profileAvatar.src;
});

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
const loadText = 'Сохранение...';
let oldText = '';
function renderLoading(buttonName) {
  if (buttonName.textContent !== loadText) {
    oldText = buttonName.textContent;
    buttonName.textContent = loadText;
  } else {
    buttonName.textContent = oldText;
  }
}

// Обработка submit в popupAvatar
formEditAvatar.addEventListener('submit', () => {
  renderLoading(popupButtonAvatar);
  postProfileAvatar(popupInputLinkAvatar.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // closePopup(popupAvatar);
      renderLoading(popupButtonAvatar);
    });
  closePopup(popupAvatar);
});

// Обработка submit в popupProfile
formEditProfile.addEventListener('submit', () => {
  renderLoading(popupButtonProfile);
  postProfileInfo(popupInputName.value, popupInputAbout.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileAbout.textContent = result.about;
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupButtonProfile);
    });
  closePopup(popupProfile);
});

// Обработка submit в popupAdd
formAddCard.addEventListener('submit', () => {
  renderLoading(popupButtonCard);
  postNewCards(popupInputPlace.value, popupInputLink.value)
    .then((result) => {
      renderCard(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popupButtonCard);
    });
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
