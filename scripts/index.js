// общие
const container = document.querySelector('.page__container');
const cardsContainer = container.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;
const keyEscape = 'Escape';
const popupActive = document.querySelector('.popup_opened');

// Поля и кнопки блока Profile
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const buttonEdit = container.querySelector('.profile__edit-button');
const buttonAdd = container.querySelector('.profile__add-button');

// popup Profile
const popupProfile = container.querySelector('.popup_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const popupAdd = container.querySelector('.popup_add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');

// popup View
const popupView = container.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__view-image');
const popupViewTitle = popupView.querySelector('.popup__view-title');

// popup Общие
const validationSettings  = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

// Добавление карточек на страницу при загрузке
// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const createCard = ({name, link}) => {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__del-button').addEventListener('click', () => {
    cardElement.remove();
  });

  cardElementImage.addEventListener('click', () => {

    popupViewImage.src = link;
    popupViewImage.alt = name;
    popupViewTitle.textContent = name;
    openPopup(popupView);

  });

  return cardElement;

}


const renderCard = (data) => {

  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек

}


initialCards.forEach(renderCard);


// Функция открытия popup
const openPopup = (popup) => {

  cleanPopup(popup);
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


const closePopupOnPressKey = (evt) => {

  if (evt.key === keyEscape) {

    const popupOpen = container.querySelector('.popup_opened');
    closePopup(popupOpen);

  }
}


const closePopupOnClickOverlay = (evt) => {

  const targetOverlay = evt.target.classList.contains('popup');
  const targetBtnClose = evt.target.classList.contains('popup__close-btn');
  if (targetOverlay || targetBtnClose) {

    closePopup(evt.currentTarget);

  }
}


// start
// Событие по кнопке buttonEdit
buttonEdit.addEventListener('click', () => {

  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;

});


// Событие по кнопке buttonAdd
buttonAdd.addEventListener('click', () => {

  openPopup(popupAdd);
  popupAddForm.reset();

});


// submit
// Обработка submit в popupProfile
popupProfileForm.addEventListener('submit', function (evt) {


  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;

  closePopup(popupProfile);
});


// Обработка submit в popupAdd
popupAddForm.addEventListener('submit', function (evt) {


  const data = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(data);
  closePopup(popupAdd);

});


function cleanPopup(popup) {

  if (popup.querySelector(validationSettings.formSelector) !== null) {

    const form = popup.querySelector(validationSettings.formSelector);
    const inputsList = form.querySelectorAll(validationSettings.inputSelector);
    inputsList.forEach(input => {

      searchErrorPlace(input);
      hideInputError(input, errorPlace, validationSettings);

    });
    const button = form.querySelector(validationSettings.submitButtonSelector);
    button.classList.add(validationSettings.inactiveButtonClass);

  }
}


enableValidation(validationSettings);
