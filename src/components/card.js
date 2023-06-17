import { container, profileId } from "./utils.js";
import { openPopup } from "./modal.js";
import { deleteCard, addLike, deleteLike } from './api.js';

const cardsContainer = container.querySelector('.elements');
const cardTemplate = container.querySelector('#card').content;

// popup View
const popupView = container.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__view-image');
const popupViewTitle = popupView.querySelector('.popup__view-title');

// Создание новой карточки
// const createCard = ({name, link, likes, owner, _id}) => {
const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardLikes =  cardElement.querySelector('.element__likes');
  const cardDelButton = cardElement.querySelector('.element__del-button');
  if (profileId.dataset.userId === data.owner._id) {
    cardDelButton.classList.remove('element__del-button_disabled');
    cardDelButton.addEventListener('click', () => {
      deleteCard(cardElement.dataset.cardId)
        .then((result) => {
          console.log(result);
          cardElement.remove();
          // location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  cardElement.dataset.cardId = data._id;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  cardLikes.textContent = data.likes.length;
  cardElement.querySelector('.element__title').textContent = data.name;
  data.likes.forEach((arrLikes) => {
    if (arrLikes._id === profileId.dataset.userId) {
      cardElement.querySelector('.element__like').classList.add('element__like_active');
    }
  });
  cardElement.querySelector('.element__like').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like_active');
    if (!e.target.classList.contains('element__like_active')) {
      deleteLike(cardElement.dataset.cardId)
        .then((result) => {
          cardLikes.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(cardElement.dataset.cardId)
        .then((result) => {
          cardLikes.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  cardElementImage.addEventListener('click', () => {
    popupViewImage.src = data.link;
    popupViewImage.alt = data.name;
    popupViewTitle.textContent = data.name;
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
