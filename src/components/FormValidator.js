export default class FormValidator {
  constructor(obj, formElement) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ' ';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  }

  toggleButtonState(hasInvalidInput, buttonElement) {
    if(hasInvalidInput) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this.toggleButtonState(this._hasInvalidInput(inputs), buttonElement);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);

        this.toggleButtonState(this._hasInvalidInput(inputs), buttonElement);
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

