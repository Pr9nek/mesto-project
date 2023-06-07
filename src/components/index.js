import '../pages/index.css';
import { getUser, getInitialCards, createCard as postCard, setAvatar, setProfile } from '../api';
import { enableValidation } from './validate';
import { createCard } from './card';
import { closePopup, openPopup, handlePopupCloseClick, handlePopupEscapeKeyup } from './modal';

const popupInfoButton = document.querySelector('.profile__user-edit-button');
const popupInfo = document.querySelector('.profile-popup');
const popupCardButton = document.querySelector('.profile__photo-edit');
const popupCard = document.querySelector('.cards-popup');
const popupButtonAvatar = document.querySelector('.profile__ava-container')
const popupAvatar = document.querySelector('.avatar-popup');
const formInfoElement = document.forms['user'];
const nameInfoInput = document.querySelector('#user_mod_name');
const statusInfoInput = document.querySelector('#user_mod_status');
const formAvatarElement = document.forms['avatar'];
const avatarLinkInput = document.querySelector('#user_mod_avatar');
const avatar = document.querySelector('.profile__avatar');
const user = document.querySelector('.profile__user');
const status = document.querySelector('.profile__status');
const formCardElement = document.forms['card'];
const nameCardInput = document.querySelector('#card_mod_name');
const linkCardInput = document.querySelector('#card_mod_link');
const elements = document.querySelector('.elements');

getUser()
  .then((data) => getUserData(data))
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 

getInitialCards()
  .then((cards) => {
    for (let i = 0; i < cards.length; i++) {
      elements.append(createCard(cards[i]));
    };
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 

function getUserData(data){
  avatar.src = data.avatar;
  user.textContent = data.name;
  status.textContent = data.about;
}

handlePopupCloseClick();
handlePopupEscapeKeyup();

popupInfoButton.addEventListener('click', function() {
    openPopup(popupInfo);
});

popupCardButton.addEventListener('click', function() {
    openPopup(popupCard);
});

popupButtonAvatar.addEventListener('click', function(){
    openPopup(popupAvatar);
});

formInfoElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);
formAvatarElement.addEventListener('submit', handleAvatarFormSubmit);


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const submitButton = evt.target.querySelector('.form__button');
    submitButton.textContent = "Сохранение...";
    setProfile(nameInfoInput.value, statusInfoInput.value)
      .then((data) => {
        user.textContent = data.name;
        status.textContent = data.about;
        evt.target.reset();
        closePopup(popupInfo);
        submitButton.textContent = "Сохранить";
      });  
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); 
  const submitButton = evt.target.querySelector('.form__button');
  submitButton.textContent = "Сохранение...";
  setAvatar(avatarLinkInput.value)
    .then((user) => {
      avatar.src = user.avatar;
      evt.target.reset();
      closePopup(popupAvatar);
      submitButton.textContent = "Сохранить";
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.form__button');
  submitButton.textContent = "Сохранение...";
  const item = {
    name: nameCardInput.value,
    link: linkCardInput.value,
  };
  
  postCard(item)
  .then(res => {
    elements.prepend(createCard(res));
    evt.target.reset();
    closePopup(popupCard);
    submitButton.textContent = "Сохранить";
  });
};    

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
});

