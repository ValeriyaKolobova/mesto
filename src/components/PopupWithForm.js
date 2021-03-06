import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formElement, {handleFormSubmit}) {
    super(popupSelector);
    this._form = formElement;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  close() {
    super.close();
    this._form.reset();
  }

}


