import Popup from "./popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupPhoto = this._popup.querySelector('.popup__photo');
        this._popupSign = this._popup.querySelector('.popup__sign');
    }

    open(src, description) {
        this._popupPhoto.src = src;
        this._popupPhoto.alt = description;
        this._popupSign.textContent = description;
        super.open();
    }
}