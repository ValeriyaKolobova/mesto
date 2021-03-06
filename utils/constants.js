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
    link: './images/elements-baikal.jpg'
  },
  {
    name: 'Мыс Нюкля',
    link: './images/elements-cape-nyuklya.jpg'
  },
  {
    name: 'Гора Чёрная Пирамида',
    link: './images/elements-gora-chernaya.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/elements-kamchatka.jpg'
  },
  {
    name: 'Красная площадь',
    link: './images/elements-red-square.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/elements-saint-petersburg.jpg'
  }
];

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

