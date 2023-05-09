const closeButtons = document.querySelectorAll('.popup__close');

const popupInfoButton = document.querySelector('.profile__user-edit-button');
const popupInfo = document.querySelector('.profile-popup');

const popupCardButton = document.querySelector('.profile__photo-edit');
const popupCard = document.querySelector('.cards-popup');

const cardTemplate = document.querySelector('#card').content;
const popupPhoto = document.querySelector('.photo-popup');

const formInfoElement = document.forms["user"];
const nameInfoInput = document.querySelector('#user_mod_name');
const statusInfoInput = document.querySelector('#user_mod_status');

const user = document.querySelector('.profile__user');
const status = document.querySelector('.profile__status');

const formCardElement = document.forms['card'];
const nameCardInput = document.querySelector('#card_mod_name');
const linkCardInput = document.querySelector('#card_mod_link');

const elements = document.querySelector('.elements');
const openedPhoto = document.querySelector('.popup__photo');
const popupSign = document.querySelector('.popup__sign');

const initialCards = [
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

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.elements__photo');
  const cardSignature = cardElement.querySelector('.elements__signature');
  const likeButton = cardElement.querySelector('.elements__like');
  const trashButton = cardElement.querySelector('.elements__del');
  const cardToTrash = trashButton.closest('.elements__card');
  
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardSignature.textContent = item.name;

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like_active')
  });

  trashButton.addEventListener('click', function() {
    cardToTrash.remove(); 
    });

  cardPhoto.addEventListener('click', function() {
    openPopup(popupPhoto);
    popupSign.textContent = item.name;
    openedPhoto.src = item.link;
    openedPhoto.alt = item.name;
  });

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  elements.append(createCard(initialCards[i]));
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupInfoButton.addEventListener('click', function () {
    openPopup(popupInfo);
});

popupCardButton.addEventListener('click', function () {
    openPopup(popupCard);
});

formInfoElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    
    user.textContent = nameInfoInput.value;
    status.textContent = statusInfoInput.value;
    closePopup(popupInfo);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const item = {
    name: nameCardInput.value,
    link: linkCardInput.value,
  };
  elements.prepend(createCard(item));

  evt.target.reset();
  closePopup(popupCard);
}