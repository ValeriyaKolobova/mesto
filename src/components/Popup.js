import {escape} from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseCall = this._handleEscClose.bind(this);
    this._handleOverlayClickCloseCall = this._handleOverlayClickClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('mousedown', this._handleOverlayClickCloseCall);
    document.addEventListener('keydown', this._handleEscCloseCall);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', this._handleOverlayClickCloseCall);
    document.removeEventListener('keydown', this._handleEscCloseCall);
  }

  _handleOverlayClickClose(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    };
  }

  _handleEscClose(evt) {
    if(evt.key === escape) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });
  }

}
