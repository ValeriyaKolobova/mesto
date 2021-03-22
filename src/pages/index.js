import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  cardListSelector,
  validationConfig,
  apiConfig,
  profileEditButton,
  inputUserJob,
  inputUserName,
  imageAddButton,
  addNewCardPopupForm,
  profileInfoPopupForm,
  profileInfoPopupSubmitButton,
  addNewCardPopupSubmitButton,
  profileAvatar,
  profileAvatarImage,
  profileUserNameDisplayError,
  profileUserJobDisplayError,
  changeAvatarPopupForm,
  changeAvatarSubmitButton,
  deleteCardPopupForm
} from '../utils/constants.js';

const api = new Api(apiConfig);

const cardsList = new Section({
  renderer: (cardItem) => {
    createCard(cardItem);
  }
}, cardListSelector);

const createCard = (cardData) => {
  const cardInstance = new Card(cardData, '.card-template', {
    ownerId: userInfoInstance.getUserId(),
    handleCardClick: () => {
      popupWithImageInstance.open(cardData);
    },
    handleDeleteIconClick: () => {
      popupCardDeleteConfirm.open();
      popupCardDeleteConfirm.setSubmitHandler(() => {
        api.deleteCard(cardData['_id'])
          .then(() => {
            cardInstance.handleDeleteCard();
            popupCardDeleteConfirm.close();
          })
          .catch((err) => {
            console.log(`Произошла ошибка ${err}`);
          });
      });
    },
    handleLikeButtonClick: (evt) => {
      if(cardInstance.hasUserLiked(cardInstance.getLikesField(), userInfoInstance.getUserId())) {
        api.deleteLike(cardData['_id'])
          .then((cardJsonData) => {
            cardInstance.toggleLikeButtonState(evt);
            cardInstance.setLikeCounter(cardJsonData.likes);
            cardInstance.setLikesField(cardJsonData);
          })
          .catch((err) => {
            console.log(`Произошла ошибка ${err}`);
          });
      } else {
        api.addLike(cardData['_id'])
          .then((cardJsonData) => {
            cardInstance.toggleLikeButtonState(evt);
            cardInstance.setLikeCounter(cardJsonData.likes);
            cardInstance.setLikesField(cardJsonData);
          })
          .catch((err) => {
            console.log(`Произошла ошибка ${err}`);
          });
      }
    }
  });
  const cardElement = cardInstance.generateCard();
  cardsList.addItem(cardElement);
};


const profileInfoPopupFormValidator = new FormValidator(validationConfig, profileInfoPopupForm);
profileInfoPopupFormValidator.enableValidation();

const addNewCardPopupFormValidator = new FormValidator(validationConfig, addNewCardPopupForm);
addNewCardPopupFormValidator.enableValidation();

const changeAvatarPopupValidator = new FormValidator(validationConfig, changeAvatarPopupForm);
changeAvatarPopupValidator.enableValidation();

const popupWithImageInstance = new PopupWithImage('.popup_type_show-image');
popupWithImageInstance.setEventListeners();

const popupCardDeleteConfirm = new PopupWithForm('.popup_type_confirm-delete-card', deleteCardPopupForm, {
  handleFormSubmit: () => true
});
popupCardDeleteConfirm.setEventListeners();


const userInfoInstance = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});

const profileInfoPopup = new PopupWithForm('.popup_type_edit-personal-info', profileInfoPopupForm, {
  handleFormSubmit: (inputsData) => {
    profileInfoPopupSubmitButton.textContent = 'Сохранение...';
    api.renewUserInfo(inputsData)
      .then((newUserJsonData) => {
        userInfoInstance.setUserInfo(newUserJsonData);
        profileInfoPopup.close();
      })
      .catch((err) => {
        profileUserNameDisplayError.textContent = `Ошибка ${err}`;
        profileUserJobDisplayError.textContent = `Ошибка ${err}`;
      });
  }
});
profileInfoPopup.setEventListeners();


profileEditButton.addEventListener('click', () => {
  const userInitialInfo = userInfoInstance.getUserInfo();
  inputUserName.value = userInitialInfo.name;
  inputUserJob.value = userInitialInfo.about;

  profileInfoPopupFormValidator.hideInputErrorsOnPopupWithFormOpening();
  profileInfoPopupFormValidator.toggleButtonState();

  profileInfoPopupSubmitButton.textContent = 'Сохранить';
  profileInfoPopup.open();
});


const addNewCardPopup = new PopupWithForm('.popup_type_add-new-image', addNewCardPopupForm, {
  handleFormSubmit: (inputsData) => {
    addNewCardPopupSubmitButton.textContent = 'Сохранение...';
    api.createNewCard(inputsData)
      .then((newCardJsonData) => {
        createCard(newCardJsonData);
        addNewCardPopup.close();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }
});
addNewCardPopup.setEventListeners();

imageAddButton.addEventListener('click', () => {
  addNewCardPopupFormValidator.hideInputErrorsOnPopupWithFormOpening();
  addNewCardPopupFormValidator.toggleButtonState();
  addNewCardPopupSubmitButton.textContent = 'Создать';
  addNewCardPopup.open();
});

const changeAvatarPopup = new PopupWithForm('.popup_type_change-avatar', changeAvatarPopupForm, {
  handleFormSubmit: (inputData) => {
    changeAvatarSubmitButton.textContent = 'Сохранение...';
    api.setNewAvatar(inputData)
      .then((jsonAvatarData) => {
        profileAvatarImage.src = jsonAvatarData.avatar;
        changeAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Произошла ошибка ${err}`);
      });
  }
});
changeAvatarPopup.setEventListeners();

profileAvatar.addEventListener('click', () => {
  changeAvatarPopupValidator.hideInputErrorsOnPopupWithFormOpening();
  changeAvatarPopupValidator.toggleButtonState();
  changeAvatarSubmitButton.textContent = 'Сохранить';
  changeAvatarPopup.open();
});


Promise.all([api.getUserProfileInfo(), api.getInitialCards()])
  .then(([ userInfoObject, cardsArrayFromServer ]) => {
    userInfoInstance.setUserInfo(userInfoObject);
    userInfoInstance.setUserId(userInfoObject);
    profileAvatarImage.src = userInfoObject.avatar;

    cardsList.renderItems(cardsArrayFromServer);
  })
  .catch((err) => {
    profileUserNameDisplayError.textContent = `Ошибка ${err}`;
    profileUserJobDisplayError.textContent = `Ошибка ${err}`;
    console.log(`Произошла ошибка ${err}`);
  });





