import '../pages/index.css';
import {
  getUser,
  getInitialCards,
  createCard as postCard,
  setAvatar,
  setProfile
} from './api';
import {
  createCard
} from './card';
import {
  closePopup,
  openPopup,
  handlePopupCloseClick
} from './modal';
import {
  handleSubmit
} from '../components/utils';
import FormValidator from './form-validator';

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
export let userId;

Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    setUserData(user);
    getInitialCards(cards)
      .then((cards) => {
        cards.forEach(card => elements.append(createCard(card)))
      });
  })
  .catch(err => {
    console.log(err); // выводим ошибку в консоль
  });


function setUserData(data) {
  avatar.src = data.avatar;
  user.textContent = data.name;
  status.textContent = data.about;
  userId = data._id;
}

handlePopupCloseClick();

popupInfoButton.addEventListener('click', function () {
  nameInfoInput.value = user.textContent;
  statusInfoInput.value = status.textContent;
  openPopup(popupInfo);
});

popupCardButton.addEventListener('click', function () {
  openPopup(popupCard);
});

popupButtonAvatar.addEventListener('click', function () {
  openPopup(popupAvatar);
});

formInfoElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);
formAvatarElement.addEventListener('submit', handleAvatarFormSubmit);

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return setProfile(nameInfoInput.value, statusInfoInput.value).then((data) => {
      user.textContent = data.name;
      status.textContent = data.about;
      closePopup(popupInfo);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}


function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return setAvatar(avatarLinkInput.value).then((user) => {
      avatar.src = user.avatar;
      closePopup(popupAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleCardFormSubmit(evt) {
  const item = {
    name: nameCardInput.value,
    link: linkCardInput.value,
  };
  function makeRequest() {
    return postCard(item).then(res => {
      elements.prepend(createCard(res));
      closePopup(popupCard);
    });
  }
  handleSubmit(makeRequest, evt);
};

const userFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error'
}, document.forms['user']);

userFormValidator.enableValidation();