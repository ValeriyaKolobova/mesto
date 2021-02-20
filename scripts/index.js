import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {imagePopupOverlay, openPopupOverlay, closePopupOverlay} from './utils.js';

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

const imagePopupCloseButton = imagePopupOverlay.querySelector('.popup__close-button');

const cardsList = document.querySelector('.elements__cards-list');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//creating an instance for FormValidator class (profilePopupForm)
const profilePopupFormValidator = new FormValidator(validationConfig, profilePopupForm);
profilePopupFormValidator.enableValidation();

//creating an instance for FormValidator class (newImagePopupForm)
const newImagePopupFormValidator = new FormValidator(validationConfig, newImagePopupForm);
newImagePopupFormValidator.enableValidation();

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

//opening the profile popup with the existing values for the user's name and job displayed on the main page
//hiding the input error messages,
//enabling an active state of submit button
function handleProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  const inputs = Array.from(profilePopupForm.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    profilePopupFormValidator.hideInputError(profilePopupForm, input, validationConfig.errorClass, validationConfig.inputErrorClass);
  });
  profilePopupFormValidator.toggleButtonState(false, profilePopupSubmitButton, validationConfig.inactiveButtonClass);
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
  newImagePopupFormValidator.toggleButtonState(true, newImageSubmitButton, validationConfig.inactiveButtonClass);
  const inputs = Array.from(newImagePopupForm.querySelectorAll('.popup__input'));
  inputs.forEach(input => {
    newImagePopupFormValidator.hideInputError(newImagePopupForm, input, validationConfig.errorClass, validationConfig.inputErrorClass);
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
