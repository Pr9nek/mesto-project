function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

const popupInfoButton = document.querySelector('.profile__user-edit-button');
const popupInfo = document.querySelector('.popup');
const popupInfoCloseButton = document.querySelector('.popup__close');

const popupCardButton = document.querySelector('.profile__photo-edit');
const popupCard = document.querySelector('.popup_cards');
const popupCardCloseButton = document.querySelector('.popup__close_cards');

popupInfoButton.addEventListener('click', function () {
    togglePopup(popupInfo);
});

popupCardButton.addEventListener('click', function () {
    togglePopup(popupCard);
});

popupInfoCloseButton.addEventListener('click', function () {
    togglePopup(popupInfo);
});

popupCardCloseButton.addEventListener('click', function () {
    togglePopup(popupCard);
});

const formInfoElement = document.querySelector('.form');
const nameInfoInput = document.querySelector('#user_mod_name');
const statusInfoInput = document.querySelector('#user_mod_status');

const user = document.querySelector('.profile__user');
const status = document.querySelector('.profile__status');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    user.textContent = nameInfoInput.value;
    status.textContent = statusInfoInput.value;
    togglePopup(popupInfo);
}

formInfoElement.addEventListener('submit', formSubmitHandler);

const formCardElement = popupCard.querySelector('.form_cards');
const nameCardInput = document.querySelector('#card_mod_name');
const linkCardInput = document.querySelector('#card_mod_link');

function formCardSubmitHandler (evt) {
  evt.preventDefault(); 
  
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  let cardPhoto = cardElement.querySelector('.elements__photo');
  let cardSignature = cardElement.querySelector('.elements__signature');
  
  cardPhoto.src = linkCardInput.value;
  cardSignature.textContent = nameCardInput.value;

  elements.prepend(cardElement);

  togglePopup(popupCard);
}

formCardElement.addEventListener('submit', formCardSubmitHandler);

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
