function enableValidation(config) {

  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((formElement) => {

    formElement.addEventListener('submit', evt => evt.preventDefault() );
    enableFieldHandler(formElement, config);

  });
}


function enableFieldHandler(form, config) {

  const inputsList = form.querySelectorAll(config.inputSelector);
  inputsList.forEach(input => {

    input.addEventListener('input', (evt) => enableInputHandler(evt, form, config));

  });
}


function enableInputHandler(evt, form, config){

  const input = evt.target;
  searchErrorPlace(input);
  showFieldError(input, errorPlace, config);
  setSubmitButtonState(form, config);

}


function searchErrorPlace(input) {

  const inputId = input.getAttribute('id');
  return errorPlace = document.getElementById(`${inputId}-error`);

}


function showFieldError(input, errorPlace, config) {

  if (!input.validity.valid ) {

    showInputError(input, errorPlace, config);

  } else {

    hideInputError(input, errorPlace, config);

  }
}


function showInputError(input, errorPlace, config) {

  input.classList.add(config.inputErrorClass);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(config.errorClass);

}


function hideInputError(input, errorPlace, config) {

  input.classList.remove(config.inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(config.errorClass);

}


function  setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {

    button.classList.remove(config.inactiveButtonClass);

  } else {

    button.classList.add(config.inactiveButtonClass);

  }
}
