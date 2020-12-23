let profileEditButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupOverlay = document.querySelector('.popup');
let popupCloseButton = popupOverlay.querySelector('.popup__close-button');
let inputName = popupOverlay.querySelector('.popup__input_type_name');
let inputJob = popupOverlay.querySelector('.popup__input_type_job');
let popupForm = popupOverlay.querySelector('.popup__container');

function openPopup() {
  popupOverlay.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popupOverlay.classList.remove('popup_opened');
}

function submitForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', submitForm);
