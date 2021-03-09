import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(cardItem) {
    super.open();
    this._popupImageCaption.textContent = cardItem.name;
    this._popupImage.src = cardItem.link;
    this._popupImage.alt = `Изображение ${cardItem.name}`;
  }
}
