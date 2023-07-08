export default class FormValidator {
    constructor(formConfig, form) {
        this._form = form;
        this._formConfig = formConfig;
        this._inputSelector = formConfig.inputSelector;
        this._submitButtonSelector = formConfig.submitButtonSelector;
        this._inactiveButtonClass = formConfig.inactiveButtonClass;
        this.inputErrorClass = formConfig.inputErrorClass;
    }

    //проверяет валидность поля, внутри вызывает showInputError или hideInputError.
    _checkInputValidity(formElement, inputElement, inputErrorClass) {
        if (inputElement.validity.patternMismatch) {
            // проверяем на кастомную валидность
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
        } else {
            this._hideInputError(formElement, inputElement, inputErrorClass);
        }
    }

    _showInputError(formElement, inputElement, errorMessage, inputErrorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        // errorElement.classList.add('form__input-error_active');
    };

    _hideInputError(formElement, inputElement, inputErrorClass) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        // errorElement.classList.remove('form__input-error_active');
        errorElement.textContent = '';
    };

    //Проверяем наличие невалидного поля, чтобы блокировать кнопку
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    //Управляем кнопкой submit
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement, inactiveButtonClass)
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(inactiveButtonClass);
        }
    }

    // Добавляем валидацию всем полям input
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);

        // деактивируем кнопку при 1й загрузке сайта
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

        formElement.addEventListener('reset', () => {
            this._disableButton(buttonElement, this._inactiveButtonClass);
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {    
                this._checkInputValidity(formElement, inputElement, this._inputErrorClass);
                // чтобы проверять его при изменении любого из полей
                this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
            });
        });
    };

    _disableButton(buttonElement, inactiveButtonClass) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners(this._form);
    }
}