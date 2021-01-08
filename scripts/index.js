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

const initialCards = [
  {
    name: 'Байкал',
    link: './images/elements-baikal.jpg',
    description: 'Скалистый берег озера Байкал'
  },
  {
    name: 'Мыс Нюкля',
    link: './images/elements-cape-nyuklya.jpg',
    description: 'Мыс Нюкля'
  },
  {
    name: 'Гора Чёрная Пирамида',
    link: './images/elements-gora-chernaya.jpg',
    description: 'Гора Чёрная Пирамида'
  },
  {
    name: 'Камчатка',
    link: './images/elements-kamchatka.jpg',
    description: 'Вулкан на Камчатке'
  },
  {
    name: 'Красная площадь',
    link: './images/elements-red-square.jpg',
    description: 'Красная площадь ночью'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/elements-saint-petersburg.jpg',
    description: 'Казанский собор в Санкт-Петербурге'
  }
];

function openPopupOverlay(popupOverlay) {
  popupOverlay.classList.add('popup_opened');
}

function closePopupOverlay(popupOverlay) {
  popupOverlay.classList.remove('popup_opened');
}

function renderImage(image) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.elements__image').src = image.link;
  cardElement.querySelector('.elements__image').alt = image.description;
  cardElement.querySelector('.elements__title').textContent = image.name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like-button_active');
  });

  cardElement.querySelector('.elements__delete-button').addEventListener('click', evt => {
    evt.target.closest('.elements__card').remove();
  });

  cardElement.querySelector('.elements__image').addEventListener('click', evt => {
    openPopupOverlay(imagePopupOverlay);
    imageCaptionPopup.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    imagePopup.src = evt.target.src;
    imagePopup.alt = evt.target.alt;
  });

  cardsList.append(cardElement);
}

function renderImages() {
  initialCards.forEach(item => {
    renderImage(item);
  })
}

renderImages();

function openProfilePopup() {
  openPopupOverlay(profilePopupOverlay);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupOverlay(profilePopupOverlay);
}

function openNewImagePopup() {
  openPopupOverlay(newImagePopupOverlay);
  newImageName.value = '';
  newImageLink.value = '';
}

function submitNewImagePopupForm(evt) {
  evt.preventDefault();
  const newImageObject = {
    name: newImageName.value,
    link: newImageLink.value,
    description: newImageName.value,
  }

  initialCards.push(newImageObject);

  renderImage(newImageObject);
  const cards = cardsList.children;
  cardsList.prepend(cards[cards.length-1]);

  closePopupOverlay(newImagePopupOverlay);
}

profileEditButton.addEventListener('click', openProfilePopup);

profilePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(profilePopupOverlay);
});

profilePopupForm.addEventListener('submit', submitProfileForm);

imageAddButton.addEventListener('click', openNewImagePopup);

newImagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(newImagePopupOverlay);
});

newImagePopupForm.addEventListener('submit',submitNewImagePopupForm);

imagePopupCloseButton.addEventListener('click', () => {
  closePopupOverlay(imagePopupOverlay);
});

