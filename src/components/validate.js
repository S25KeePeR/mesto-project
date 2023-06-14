// включение валидации для всех форм на сайте
function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    enableFieldHandler(formElement, config);
  });
}

// Подключение слушателя к полям форм
function enableFieldHandler(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  inputsList.forEach(input => {
    input.addEventListener('input', (e) => {
      enableInputHandler(e, form, config);
    });

  });
}

// включение валидации для полей ввода
function enableInputHandler(e, form, config) {
  const input = e.target;
  let errorPlace = searchErrorPlace(input);
  showFieldError(input, errorPlace, config);
  setSubmitButtonState(form, config);
}

// поиск поля для вывода ошибки
function searchErrorPlace(input) {
  const inputId = input.getAttribute('id');
  // return errorPlace = document.getElementById(`${inputId}-error`);
  // let errorPlace = document.getElementById(`${inputId}-error`);
  // console.log(errorPlace);
  // return errorPlace;
  return document.getElementById(`${inputId}-error`);
}

// проверяем валидность поля
function showFieldError(input, errorPlace, config) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(input, errorPlace, config);
  } else {
    hideInputError(input, errorPlace, config);
  }
}

// показать сообщение об ошибке
function showInputError(input, errorPlace, config) {
  input.classList.add(config.inputErrorClass);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(config.errorClass);
}

// убрать сообщение об ошибке
function hideInputError(input, errorPlace, config) {
  input.classList.remove(config.inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(config.errorClass);
}

// отправка формы
function  setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute("disabled");
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute("disabled", "disabled");
  }
}

function resetError(popup, config) {
  const form = popup.querySelector(config.formSelector);
  const inputsList = form.querySelectorAll(config.inputSelector);
  inputsList.forEach(input => {
    let errorPlace = searchErrorPlace(input);
    hideInputError(input, errorPlace, config);
  });
  setSubmitButtonState(form, config);
}

export { enableValidation, resetError };
