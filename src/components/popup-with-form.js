import Popup from "./popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submitCall) {
        super(selector);
        this._submitCall = submitCall;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.form');
        // this._form.addEventListener('submit', () => this._submitCall(this._getInputValues()));
        this._form.addEventListener('submit', (evt) => {
            this._submitButton = evt.submitter;
            this.renderLoading(true);
            this._submitCall(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = buttonText;
        }
    }
}

    