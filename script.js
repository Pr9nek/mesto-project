function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

const popupInfoButton = document.querySelector('.profile__user-edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

popupInfoButton.addEventListener('click', function () {
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

let initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

    // initialCards = [
    //     {},
    //     ...initialCards,
    // ]

    const cardTemplate = document.querySelector('#card').content;
    const elements = document.querySelector('.elements');

    for (let i = 0; i < initialCards.length; i++) {
        const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

        let cardPhoto = cardElement.querySelector('.elements__photo');
        let cardSignature = cardElement.querySelector('.elements__signature');
        
        cardPhoto.src = initialCards[i].link;
        cardSignature.textContent = initialCards[i].name;

        elements.append(cardElement);
    }
