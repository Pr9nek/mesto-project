import Popup from "./popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(src, description) {
        this._popup.querySelector('.popup__photo').src = src;
        this._popup.querySelector('.popup__sign').textContent = description;
        super.open();
    }
}