function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

const popupButton = document.querySelector('.profile__user-edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

popupButton.addEventListener('click', function () {
    togglePopup(popup);
});

popupCloseButton.addEventListener('click', function () {
    togglePopup(popup);
});

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#user_mod_name');
const statusInput = document.querySelector('#user_mod_status');

const user = document.querySelector('.profile__user');
const status = document.querySelector('.profile__status');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    user.textContent = nameInput.value;
    status.textContent = statusInput.value;
    togglePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

