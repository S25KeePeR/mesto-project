import { container } from "./utils.js";
import { openPopup } from "./modal.js";

const cardsContainer = container.querySelector('.elements');
const cardTemplate = container.querySelector('#card').content;
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

// Добавление созданной карточки на сайт
const renderCard = (data) => {
  const cardElement = createCard(data);   // Создаем карточку на основе данных
  cardsContainer.prepend(cardElement);  // Помещаем ее в контейнер карточек
}

export { renderCard };
