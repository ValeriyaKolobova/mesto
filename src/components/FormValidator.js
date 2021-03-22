export default class FormValidator {
  constructor(obj, formElement) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ' ';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  hideInputErrorsOnPopupWithFormOpening() {
    this._inputList.forEach(input => this._hideInputError(input));
  }

  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  }

  toggleButtonState() {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {

    this.toggleButtonState();

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);

        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
