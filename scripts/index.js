// общие
const container = document.querySelector('.page');
const cardsContainer = container.querySelector('.elements');
const cardTemplate = container.querySelector('#card').content;
const keyEscape = 'Escape';
const popupActive = container.querySelector('.popup_opened');

// Поля и кнопки блока Profile
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const buttonOpenEditProfileForm = container.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = container.querySelector('.profile__add-button');

// popup Profile
const popupProfile = container.querySelector('.popup_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfile.querySelector('.popup__input_type_name');
const popupInputAbout = popupProfile.querySelector('.popup__input_type_about');

// popup Add
const popupAdd = container.querySelector('.popup_add');
const formAddCard = popupAdd.querySelector('.popup__form');
const popupInputPlace = popupAdd.querySelector('.popup__input_type_place');
const popupInputLink = popupAdd.querySelector('.popup__input_type_link');

// popup View
const popupView = container.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__view-image');
const popupViewTitle = popupView.querySelector('.popup__view-title');

// Создание новой карточки
const createCard = ({name, link}) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__like').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like_active');
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

// Добавление карточек при старте страницы
const renderCard = (data) => {
  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек
}
initialCards.forEach(renderCard);

// Функция открытия popup
const openPopup = (popup) => {
  //cleanPopup(popup);
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

// Закрытие popup при клике на кнопку ESC
const closePopupOnPressKey = (e) => {
  if (e.key === keyEscape) {
    const popupOpen = container.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

// Закрытие popup по клику на overlay
const closePopupOnClickOverlay = (e) => {

  const targetOverlay = e.target.classList.contains('popup');
  const targetBtnClose = e.target.classList.contains('popup__close-btn');
  if (targetOverlay || targetBtnClose) {
    closePopup(e.currentTarget);
  }
}

// start
// Событие по кнопке buttonEdit
buttonOpenEditProfileForm.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

// Событие по кнопке buttonAdd
buttonOpenAddCardForm.addEventListener('click', () => {
  openPopup(popupAdd);
  formAddCard.reset();
});

// submit
// Обработка submit в popupProfile
popupProfileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupProfile);
});

// Обработка submit в popupAdd
formAddCard.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {name: popupInputPlace.value, link: popupInputLink.value};
  renderCard(data);
  closePopup(popupAdd);
});
