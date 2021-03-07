import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  cardListSelector,
  initialCards,
  validationConfig,
  profileEditButton,
  inputUserJob,
  inputUserName,
  imageAddButton,
  addNewCardPopupForm,
  profileInfoPopupForm,
  profileInfoPopupSubmitButton,
  addNewCardPopupSubmitButton
} from '../utils/constants.js';

const handleCreateCard = (cardData) => {
  const cardInstance = new Card(cardData, '.card-template', {
    handleCardClick: () => {
      popupWithImageInstance.open(cardData);
    }
  });
  const cardElement = cardInstance.generateCard();
  cardsList.addItem(cardElement);
};

const hideInputErrorOnPopupOpen = (popupForm, popupFormValidator, {inputSelector, errorClass, inputErrorClass}) => {
  const inputs = Array.from(popupForm.querySelectorAll(inputSelector));
  inputs.forEach(input => {
    popupFormValidator.hideInputError(popupForm, input, errorClass, inputErrorClass);
  });
};

const profileInfoPopupFormValidator = new FormValidator(validationConfig, profileInfoPopupForm);
profileInfoPopupFormValidator.enableValidation();

const addNewCardPopupFormValidator = new FormValidator(validationConfig, addNewCardPopupForm);
addNewCardPopupFormValidator.enableValidation();

const popupWithImageInstance = new PopupWithImage('.popup_type_show-image');
popupWithImageInstance.setEventListeners();

const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    handleCreateCard(cardItem);
  }
}, cardListSelector);

cardsList.renderItems();

const userInfoInstance = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});

const profileInfoPopup = new PopupWithForm('.popup_type_edit-personal-info', profileInfoPopupForm, {
  handleFormSubmit: (inputsData) => {
    userInfoInstance.setUserInfo(inputsData);
  }
});
profileInfoPopup.setEventListeners();


profileEditButton.addEventListener('click', () => {
  const userInitialInfo = userInfoInstance.getUserInfo();
  inputUserName.value = userInitialInfo.name;
  inputUserJob.value = userInitialInfo.job;

  hideInputErrorOnPopupOpen(profileInfoPopupForm, profileInfoPopupFormValidator, validationConfig);
  profileInfoPopupFormValidator.toggleButtonState(false, profileInfoPopupSubmitButton, validationConfig.inactiveButtonClass);

  profileInfoPopup.open();
});

const addNewCardPopup = new PopupWithForm('.popup_type_add-new-image', addNewCardPopupForm, {
  handleFormSubmit: (inputsData) => {
    handleCreateCard(inputsData);
  }
});
addNewCardPopup.setEventListeners();

imageAddButton.addEventListener('click', () => {
  hideInputErrorOnPopupOpen(addNewCardPopupForm, addNewCardPopupFormValidator, validationConfig);
  addNewCardPopupFormValidator.toggleButtonState(true, addNewCardPopupSubmitButton, validationConfig.inactiveButtonClass);
  addNewCardPopup.open();
});
