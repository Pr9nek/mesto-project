export default class Popup {
    constructor(selector) {
        this._selecor = selector;
        this._popup = document.querySelector(this._selecor);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));

        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}