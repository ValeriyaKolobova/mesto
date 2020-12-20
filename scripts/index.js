let profileEditButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupOverlay = document.querySelector('.popup');
let popupCloseButton = popupOverlay.querySelector('.popup__close-button');
let inputName = popupOverlay.querySelector('.popup__input_type_name');
let inputJob = popupOverlay.querySelector('.popup__input_type_job');
let popupForm = popupOverlay.querySelector('.popup__container');

function togglePopup() {
  popupOverlay.classList.toggle('popup_opened');
}

function renderPopupInfo() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function submitForm(evt) {
  evt.preventDefault();
  let nameEntered = inputName.value;
  let jobEntered = inputJob.value;
  profileName.textContent = nameEntered;
  profileJob.textContent = jobEntered;
  togglePopup();
}

profileEditButton.addEventListener('click', function(){
  togglePopup();
  renderPopupInfo();
});

popupCloseButton.addEventListener('click', togglePopup);

popupOverlay.addEventListener('click', function (evt) {
  if(evt.target === evt.currentTarget) {
    togglePopup();
  }
})

popupForm.addEventListener('submit', submitForm);
