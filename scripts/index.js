const profileEditButton = document.querySelector('.profile__edit-button');
const imageAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profilePopupOverlay = document.querySelector('.popup_type_edit-personal-info');
const inputName = profilePopupOverlay.querySelector('.popup__input_type_name');
const inputJob = profilePopupOverlay.querySelector('.popup__input_type_job');
const profilePopupCloseButton = profilePopupOverlay.querySelector('.popup__close-button');
const profilePopupForm = profilePopupOverlay.querySelector('.popup__form');

const newImagePopupOverlay = document.querySelector('.popup_type_add-new-image');
const newImagePopupCloseButton = newImagePopupOverlay.querySelector('.popup__close-button');
const newImagePopupForm = newImagePopupOverlay.querySelector('.popup__form');
const newImageName = newImagePopupOverlay.querySelector('.popup__input_type_place-name');
const newImageLink = newImagePopupOverlay.querySelector('.popup__input_type_link');

const imagePopupOverlay = document.querySelector('.popup_type_show-image');
const imageCaptionPopup = imagePopupOverlay.querySelector('.popup__caption');
const imagePopup = imagePopupOverlay.querySelector('.popup__image');
const imagePopupCloseButton = imagePopupOverlay.querySelector('.popup__close-button');

const cardsList = document.querySelector('.elements__cards-list');
const cardTemplate = document.querySelector('.card-template').content;

function openPopupOverlay(popupOverlay) {
  popupOverlay.classList.add('popup_opened');
}

function closePopupOverlay(popupOverlay) {
  popupOverlay.classList.remove('popup_opened');
}

function handleLikeButton(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

function handleDeleteCard(evt) {
  evt.target.closest('.elements__card').remove();
}

/*
function opens the popup with the enlarged existing image and its full description
*/
function handlePreviewImage(photo) {
  imageCaptionPopup.textContent = photo.name;
  imagePopup.src = photo.link;
  imagePopup.alt = `Изображение ${photo.name}`;
  openPopupOverlay(imagePopupOverlay);
}

function createCard(image) {
  /*
  getting access to the card template and its child elements
  */
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector('.elements__like-button');
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  const cardImage = cardElement.querySelector('.elements__image');
  const cardImageName = cardElement.querySelector('.elements__title');

  /*
  filling the card's elements with contents
  */
  cardImageName.textContent = image.name;
  cardImage.src = image.link;
  cardImage.alt = `Изображение ${image.name}`;

  /*
  adding event handlers to the card's elements
  */
  likeButton.addEventListener('click', handleLikeButton);

  deleteButton.addEventListener('click', handleDeleteCard);

  cardImage.addEventListener('click', () => {
    handlePreviewImage(image);
  });

  return cardElement;
}

function addCard(parentElem, card) {
  parentElem.prepend(card);
}

/*
rendering the initial page: going through every element of the input array with images,
creating the cards with the images,
adding the image cards to their parent container
*/
initialCards.forEach(item => {
  addCard(cardsList, createCard(item));
});

/*
opening the profile popup with the existing values for the user's name and job displayed on the main page
*/
function handleProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopupOverlay(profilePopupOverlay);
}

/*
reading new values of the user's name and job and their rendering on the main page
*/
function handleProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupOverlay(profilePopupOverlay);
}

/*
adding a new image:
reading the values of the new image's source and title and creating a new image card from them,
reseting the values of the form's text inputs to their initial values,
closing the popup
*/
function handleNewImagePopupForm(evt) {
  evt.preventDefault();
  addCard(cardsList, createCard({name: newImageName.value, link: newImageLink.value}));
  newImagePopupForm.reset();
  closePopupOverlay(newImagePopupOverlay);
}

profileEditButton.addEventListener('click', handleProfilePopup);

profilePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(profilePopupOverlay);
});

profilePopupForm.addEventListener('submit', handleProfileForm);

imageAddButton.addEventListener('click', () => {
  openPopupOverlay(newImagePopupOverlay);
});

newImagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(newImagePopupOverlay);
});

newImagePopupForm.addEventListener('submit', handleNewImagePopupForm);

imagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(imagePopupOverlay);
});

