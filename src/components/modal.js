export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function handlePopupCloseClick() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        popup.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                closePopup(popup);
            }
        });
    });
};

// export function handlePopupEscapeKeyup() {
//     document.addEventListener('keyup', function (evt) {
//         if (evt.key === 'Escape') {
//             const popup = document.querySelector('.popup_opened');
//             closePopup(popup);
//         }
//     });
// }


export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}