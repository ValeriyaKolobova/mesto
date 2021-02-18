import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const imageAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profilePopupOverlay = document.querySelector('.popup_type_edit-personal-info');
const profilePopupCloseButton = profilePopupOverlay.querySelector('.popup__close-button');
const profilePopupForm = document.forms['popup-profile-info'];
const inputName = profilePopupForm.elements.name;
const inputJob = profilePopupForm.elements.job;
const profilePopupSubmitButton = profilePopupForm.querySelector('.popup__button');

const newImagePopupOverlay = document.querySelector('.popup_type_add-new-image');
const newImagePopupCloseButton = newImagePopupOverlay.querySelector('.popup__close-button');
const newImagePopupForm = document.forms['popup-add-picture'];
const newImageName = newImagePopupForm.elements['place-name'];
const newImageLink = newImagePopupForm.elements.link;
const newImageSubmitButton = newImagePopupForm.elements['submit-new-image'];

export const imagePopupOverlay = document.querySelector('.popup_type_show-image');
export const imageCaptionPopup = imagePopupOverlay.querySelector('.popup__caption');
export const imagePopup = imagePopupOverlay.querySelector('.popup__image');
const imagePopupCloseButton = imagePopupOverlay.querySelector('.popup__close-button');

const cardsList = document.querySelector('.elements__cards-list');

//creating an instance for FormValidator class (profilePopupForm)
const profilePopupFormValidator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, profilePopupForm);

profilePopupFormValidator.enableValidation();

//creating an instance for FormValidator class (newImagePopupForm)
const newImagePopupFormValidator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, newImagePopupForm);

newImagePopupFormValidator.enableValidation();

function closePopupOverlay(popupOverlay) {
  popupOverlay.classList.remove('popup_opened');
  popupOverlay.removeEventListener('click', handlePopupClosureByOverlayClick);
  document.removeEventListener('keydown', handlePopupClosureByEscape);
}

function handlePopupClosureByOverlayClick(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.target === evt.currentTarget) {
    closePopupOverlay(popupOpened);
  };
}

function handlePopupClosureByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopupOverlay(popupOpened);
  };
}

export function openPopupOverlay(popupOverlay) {
  popupOverlay.classList.add('popup_opened');
  popupOverlay.addEventListener('click', handlePopupClosureByOverlayClick);
  document.addEventListener('keydown', handlePopupClosureByEscape);
}

function addCard(parentElem, card) {
  parentElem.prepend(card);
}

//rendering the initial page: going through every element of the input array with images,
//creating the instances of Card class and generating new cards,
//adding the image cards to their parent container
initialCards.forEach(item => {
  const card  = new Card(item, '.card-template');
  addCard(cardsList, card.generateCard());
});

function hideFormInputError(form, input, errorClassVisible, inputErrorClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.textContent = ' ';
  errorElement.classList.remove(errorClassVisible);
  input.classList.remove(inputErrorClass);
}

function toggleButtonState(hasInvalidInput, buttonElement, buttonClassInactive) {
  if(hasInvalidInput) {
    buttonElement.classList.add(buttonClassInactive);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonClassInactive);
    buttonElement.removeAttribute('disabled');
  }
}

//opening the profile popup with the existing values for the user's name and job displayed on the main page
//hiding the input error messages,
//enabling an active state of submit button
function handleProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  const inputs = Array.from(profilePopupForm.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    hideFormInputError(profilePopupForm, input, 'popup__error_visible', 'popup__input_type_error');
  });
  toggleButtonState(false, profilePopupSubmitButton, 'popup__button_disabled');
  openPopupOverlay(profilePopupOverlay);
}

//reading new values of the user's name and job and their rendering on the main page
function handleProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupOverlay(profilePopupOverlay);
}

//adding a new image:
//reading the values of the new image's source and title and creating a new image card from them,
//closing the popup
function handleSubmitNewImagePopupForm(evt) {
  evt.preventDefault();
  const card = new Card({name: newImageName.value, link: newImageLink.value}, '.card-template');
  addCard(cardsList, card.generateCard());
  closePopupOverlay(newImagePopupOverlay);
}

//opening new image popup form:
//reseting the values of the form's text inputs to their initial values,
//hiding the input error messages left from the previous session,
//setting a disabled state of submit button
function handleOpenNewImagePopupForm() {
  newImagePopupForm.reset();
  toggleButtonState(true, newImageSubmitButton, 'popup__button_disabled');
  const inputs = Array.from(newImagePopupForm.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    hideFormInputError(newImagePopupForm, input, 'popup__error_visible', 'popup__input_type_error');
  });
  openPopupOverlay(newImagePopupOverlay);
}

profileEditButton.addEventListener('click', handleProfilePopup);

profilePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(profilePopupOverlay);
});

profilePopupForm.addEventListener('submit', handleProfileForm);

imageAddButton.addEventListener('click', handleOpenNewImagePopupForm);

newImagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(newImagePopupOverlay);
});

newImagePopupForm.addEventListener('submit', handleSubmitNewImagePopupForm);

imagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(imagePopupOverlay);
});
