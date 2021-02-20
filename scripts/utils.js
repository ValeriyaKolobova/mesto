const imagePopupOverlay = document.querySelector('.popup_type_show-image');
const imageCaptionPopup = imagePopupOverlay.querySelector('.popup__caption');
const imagePopup = imagePopupOverlay.querySelector('.popup__image');
const escape = 'Escape';

function handlePopupClosureByOverlayClick(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.target === evt.currentTarget) {
    closePopupOverlay(popupOpened);
  };
}

function handlePopupClosureByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === escape) {
    closePopupOverlay(popupOpened);
  };
}

function closePopupOverlay(popupOverlay) {
  popupOverlay.classList.remove('popup_opened');
  popupOverlay.removeEventListener('mousedown', handlePopupClosureByOverlayClick);
  popupOverlay.removeEventListener('contextmenu', evt => {
    evt.preventDefault();
  });
  document.removeEventListener('keydown', handlePopupClosureByEscape);
}

function openPopupOverlay(popupOverlay) {
  popupOverlay.classList.add('popup_opened');
  popupOverlay.addEventListener('mousedown', handlePopupClosureByOverlayClick);
  popupOverlay.addEventListener('contextmenu', evt => {
    evt.preventDefault();
  });
  document.addEventListener('keydown', handlePopupClosureByEscape);
}

export {imagePopupOverlay, imageCaptionPopup, imagePopup, openPopupOverlay, closePopupOverlay, handlePopupClosureByOverlayClick, handlePopupClosureByEscape};
