export const cardListSelector = '.elements__cards-list';
export const profileEditButton = document.querySelector('.profile__edit-button');
export const imageAddButton = document.querySelector('.profile__add-button');
export const inputUserName = document.querySelector('.popup__input_type_name');
export const inputUserJob  = document.querySelector('.popup__input_type_job');
export const addNewCardPopupForm = document.forms['popup-add-picture'];
export const addNewCardPopupSubmitButton = addNewCardPopupForm.querySelector('.popup__button');
export const profileInfoPopupForm = document.forms['popup-profile-info'];
export const profileInfoPopupSubmitButton = profileInfoPopupForm.querySelector('.popup__button');
export const profileAvatar = document.querySelector('.profile__avatar-cover');
export const profileAvatarImage = document.querySelector('.profile__avatar');
export const profileUserNameDisplayError = document.querySelector('.profile__name_type_error');
export const profileUserJobDisplayError = document.querySelector('.profile__job_type_error');
export const changeAvatarPopupForm = document.forms['popup-change-avatar'];
export const changeAvatarSubmitButton = changeAvatarPopupForm.querySelector('.popup__button');
export const deleteCardConfirmButton = document.querySelector('.popup__button_type_confirm');
export const escape = 'Escape';

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '69f5d24a-9d82-4482-8712-0c3c63467f5c',
    'Content-Type': 'application/json'
  }
};

