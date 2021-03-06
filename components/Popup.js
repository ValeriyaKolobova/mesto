import {escape} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mousedown', this._handleOverlayClickClose.bind(this));
    this._popup.addEventListener('contextmenu', evt => {
      evt.preventDefault();
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', this._handleOverlayClickClose.bind(this));
    this._popup.removeEventListener('contextmenu', evt => {
      evt.preventDefault();
    });
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if(evt.key === escape) {
      this.close(popupOpened);
    };
  }

  _handleOverlayClickClose(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if(evt.target === evt.currentTarget) {
      this.close(popupOpened);
    };
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
  }

}
