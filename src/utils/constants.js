const baikalImage = new URL('../images/elements-baikal.jpg', import.meta.url);
const capeNyuklyaImage = new URL('../images/elements-cape-nyuklya.jpg', import.meta.url);
const goraChernayaImage = new URL('../images/elements-gora-chernaya.jpg', import.meta.url);
const kamchatkaImage = new URL('../images/elements-kamchatka.jpg', import.meta.url);
const redQuareImage = new URL('../images/elements-red-square.jpg', import.meta.url);
const saintPetersburgImage = new URL('../images/elements-saint-petersburg.jpg', import.meta.url);

export const cardListSelector = '.elements__cards-list';
export const profileEditButton = document.querySelector('.profile__edit-button');
export const imageAddButton = document.querySelector('.profile__add-button');
export const inputUserName = document.querySelector('.popup__input_type_name');
export const inputUserJob  = document.querySelector('.popup__input_type_job');
export const addNewCardPopupForm = document.forms['popup-add-picture'];
export const addNewCardPopupSubmitButton = addNewCardPopupForm.querySelector('.popup__button');
export const profileInfoPopupForm = document.forms['popup-profile-info'];
export const profileInfoPopupSubmitButton = profileInfoPopupForm.querySelector('.popup__button');
export const escape = 'Escape';

export const initialCards = [
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Мыс Нюкля',
    link: capeNyuklyaImage
  },
  {
    name: 'Гора Чёрная Пирамида',
    link: goraChernayaImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Красная площадь',
    link: redQuareImage
  },
  {
    name: 'Санкт-Петербург',
    link: saintPetersburgImage
  }
];

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

