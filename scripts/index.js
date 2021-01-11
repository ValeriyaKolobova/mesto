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

function createCard(image) {
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector('.elements__like-button');
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  const cardImage = cardElement.querySelector('.elements__image');
  const cardImageName = cardElement.querySelector('.elements__title');

  cardImageName.textContent = image.name;
  cardImage.src = image.link;
  cardImage.alt = `Изображение ${image.name}`;

  function handleLikeButton(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  function handleDeleteCard(evt) {
    evt.target.closest('.elements__card').remove();
  }

  function handlePreviewImage(evt) {
    openPopupOverlay(imagePopupOverlay);
    imageCaptionPopup.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.target.alt;
  }

  likeButton.addEventListener('click', handleLikeButton);

  deleteButton.addEventListener('click', handleDeleteCard);

  cardImage.addEventListener('click', handlePreviewImage);

  return cardElement;
}

function addCard(parentElem, card) {
  parentElem.prepend(card);
}

initialCards.forEach(item => {
  addCard(cardsList, createCard(item));
});

function openProfilePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopupOverlay(profilePopupOverlay);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupOverlay(profilePopupOverlay);
}

function submitNewImagePopupForm(evt) {
  evt.preventDefault();
  addCard(cardsList, createCard({name: newImageName.value, link: newImageLink.value}));
  newImagePopupForm.reset();
  closePopupOverlay(newImagePopupOverlay);
}

profileEditButton.addEventListener('click', openProfilePopup);

profilePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(profilePopupOverlay);
});

profilePopupForm.addEventListener('submit', submitProfileForm);

imageAddButton.addEventListener('click', () => {
  openPopupOverlay(newImagePopupOverlay);
});

newImagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(newImagePopupOverlay);
});

newImagePopupForm.addEventListener('submit', submitNewImagePopupForm);

imagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(imagePopupOverlay);
});

