/*
function highlights the input field where the user makes a mistake and
shows a message indicating what kind of mistake has been made
*/
function showInputError(formElement, inputElement, errorMessage, errorElemClassVisible, inputClassError) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorElemClassVisible);
  inputElement.classList.add(inputClassError);
}

/*
function removes any highlighting from the input fields and
removes any error-related messages
*/
function hideInputError(formElement, inputElement, errorElemClassVisible, inputClassError) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = ' ';
  errorElement.classList.remove(errorElemClassVisible);
  inputElement.classList.remove(inputClassError);
}

/*
checking validity of the data entered by the user in the form's fields:
if data is invalid - show the user in which fields the mistake has been made;
if data is valid - do not show the user any error-related messages
*/
function isValid(formElement, inputElement, errorElemClassVisible, inputClassError) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorElemClassVisible, inputClassError);
  } else {
    hideInputError(formElement, inputElement, errorElemClassVisible, inputClassError);
  }
}

/*
function checks each input field: if at least in one input field the data entered by the user is invalid,
callback returns "true" and function returns "true"
*/
function hasInvalidInput(inputs) {
  return inputs.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

/*
managing the appearance of the submit button:
if the form has at least one invalid input, the button is disabled;
if all inputs in the form are valid, the button is active and clickable
*/
function toggleButtonState(inputs, buttonElement, buttonClassInactive) {
  if(hasInvalidInput(inputs)) {
    buttonElement.classList.add(buttonClassInactive);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonClassInactive);
    buttonElement.removeAttribute('disabled');
  }
}

/*
getting access to all inputs in the current form:
for each input - performing "live" validity checking of the data entered by the user and simultaneously managing the appearance of the submit button
*/
function setEventListeners(formElement, inputSelector, buttonSelector, buttonClassInactive, errorElemClassVisible, inputClassError) {
  const buttonElement = formElement.querySelector(buttonSelector);
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));

  toggleButtonState(inputs, buttonElement, buttonClassInactive);

  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, errorElemClassVisible, inputClassError);

      toggleButtonState(inputs, buttonElement, buttonClassInactive);
    });
  });
}

/*
getting access to all forms on the webpage:
for each form:
-cancelling standard submit behaviour and page reloading;
-managing all inputs in the form;
*/
function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement, obj.inputSelector, obj.submitButtonSelector, obj.inactiveButtonClass, obj.errorClass, obj.inputErrorClass);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
