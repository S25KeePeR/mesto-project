export const container = document.querySelector('.page');
export const popupProfile = container.querySelector('.popup_profile');
export const popupAdd = container.querySelector('.popup_add');
export const popupAvatar = container.querySelector('.popup_avatar');
export const profileId = container.querySelector('.profile');

const loadText = 'Сохранение...';
let oldText = '';
export const renderLoading = (buttonName) => {
  if (buttonName.textContent !== loadText) {
    oldText = buttonName.textContent;
    buttonName.textContent = loadText;
  } else {
    buttonName.textContent = oldText;
  }
}
