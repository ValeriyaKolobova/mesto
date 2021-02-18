export default class FormValidator {
  constructor(obj, formElement) {
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage, errorElemClassVisible, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorElemClassVisible);
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError(formElement, inputElement, errorElemClassVisible, inputErrorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = ' ';
    errorElement.classList.remove(errorElemClassVisible);
    inputElement.classList.remove(inputErrorClass);
  }

  _isValid(formElement, inputElement, errorElemClassVisible, inputErrorClass) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, errorElemClassVisible, inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, errorElemClassVisible, inputErrorClass);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(hasInvalidInput, buttonElement, buttonClassInactive) {
    if(hasInvalidInput) {
      buttonElement.classList.add(buttonClassInactive);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(buttonClassInactive);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(formElement, inputSelector, buttonSelector, buttonClassInactive, errorElemClassVisible, inputErrorClass) {
    const buttonElement = formElement.querySelector(buttonSelector);
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));

    this._toggleButtonState(this._hasInvalidInput(inputs), buttonElement, buttonClassInactive);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(formElement, input, errorElemClassVisible, inputErrorClass);

        this._toggleButtonState(this._hasInvalidInput(inputs), buttonElement, buttonClassInactive);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement, this._inputSelector, this._submitButtonSelector, this._inactiveButtonClass, this._errorClass, this._inputErrorClass);
  }
}
