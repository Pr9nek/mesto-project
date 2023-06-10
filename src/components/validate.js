export const enableValidation = (formConfig) => {
    const formList = Array.from(document.querySelectorAll(formConfig.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

            setEventListeners(formElement, formConfig);
    });
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    // errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

//проверяет валидность поля, внутри вызывает showInputError или hideInputError.
const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
    if (inputElement.validity.patternMismatch) {
        // проверяем на кастомную валидность
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass);
    }
};

//Проверяем наличие невалидного поля, чтобы блокировать кнопку
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//Управляем кнопкой submit
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled'); 
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

// Добавляем валидацию все полям input
function setEventListeners(formElement, formConfig) {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, formConfig.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, formConfig.inputErrorClass);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement, formConfig.inactiveButtonClass);
        });
    });
};