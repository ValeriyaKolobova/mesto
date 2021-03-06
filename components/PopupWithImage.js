import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  open(cardItem) {
    super.open();
    this._popup.querySelector('.popup__caption').textContent = cardItem.name;
    this._popup.querySelector('.popup__image').src = cardItem.link;
    this._popup.querySelector('.popup__image').alt = `Изображение ${cardItem.name}`;
  }
}
