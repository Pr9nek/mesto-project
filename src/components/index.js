import Api from './api';
import Card from './card';
import PopupWithImage from './popup-with-image';
import PopupWithForm from './popup-with-form';
import Section from './section';
import FormValidator from './form-validator';

import '../pages/index.css';

const popupInfoButton = document.querySelector('.profile__user-edit-button');
const popupInfo = document.querySelector('.profile-popup');
const popupCardButton = document.querySelector('.profile__photo-edit');
// const popupCard = document.querySelector('.cards-popup');
const popupButtonAvatar = document.querySelector('.profile__ava-container')
// const popupAvatar = document.querySelector('.avatar-popup');
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

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'c7066d33-af2e-4ab1-9be7-8983d9995740',
    'Content-Type': 'application/json'
  }
}); 

api.getUser();

api.getInitialCards()
.then((cards) => {
  const defaultCardList = new Section({
    data: cards,
    renderer: (initialCard) => {
      const card = new Card(
        initialCard,
        '#card',
        () => api.setLike(initialCard._id),
        () => api.deleteLike(initialCard._id),
        () => api.deleteCard(initialCard._id),
        () => popupPhoto.open(initialCard.link, initialCard.name)
      );
      
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  elements
  );

  defaultCardList.renderItems();
});

const popupPhoto = new PopupWithImage('.photo-popup');
popupPhoto.setEventListeners();

const popupProfile = new PopupWithForm('.profile-popup', 
  (data) => {
    api.setProfile(data.name, data.about)
      .then(() => popupProfile.close())
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
);

const popupAvatar = new PopupWithForm('.avatar-popup', 
  (data) => {
    api.setAvatar(data.avatar)
      .then(() => popupAvatar.close())
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
);

const popupCard = new PopupWithForm('.cards-popup', 
  (data) => {
    api.createCard({link: data.link, name: data.name})
      .then((cardData) => {
        popupCard.close()

        const sectionCard = new Section({
          data: [cardData],
          renderer: (newCard) => {
            const card = new Card(
              newCard,
              '#card',
              () => api.setLike(newCard._id),
              () => api.deleteLike(newCard._id),
              () => api.deleteCard(newCard._id),
              () => popupPhoto.open(newCard.link, newCard.name)
            );
            
            const cardElement = card.createCard();
            sectionCard.addItem(cardElement);
          }
        },
        elements
        );
      
        sectionCard.renderItems();
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupCard.renderLoading(false);
      });
  }
);

popupInfoButton.addEventListener('click', () => popupProfile.open());
popupProfile.setEventListeners();

popupCardButton.addEventListener('click', () => popupCard.open());
popupCard.setEventListeners();

popupButtonAvatar.addEventListener('click', () => popupAvatar.open());
popupAvatar.setEventListeners();
;

// cpnst popupCards = new PopupWithForm('.cards-popup', () => api.setProfile());

// function setUserData(data) {
//   avatar.src = data.avatar;
//   user.textContent = data.name;
//   status.textContent = data.about;
//   userId = data._id;
// }


// popupCardButton.addEventListener('click', function () {
//   openPopup(popupCard);
// });

// popupButtonAvatar.addEventListener('click', function () {
//   openPopup(popupAvatar);
// });

// formInfoElement.addEventListener('submit', handleProfileFormSubmit);
// formCardElement.addEventListener('submit', handleCardFormSubmit);
// formAvatarElement.addEventListener('submit', handleAvatarFormSubmit);

// function handleProfileFormSubmit(evt) {
//   function makeRequest() {
//     // return позволяет потом дальше продолжать цепочку `then, catch, finally`
//     return setProfile(nameInfoInput.value, statusInfoInput.value).then((data) => {
//       user.textContent = data.name;
//       status.textContent = data.about;
//       closePopup(popupInfo);
//     });
//   }
//   // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
//   handleSubmit(makeRequest, evt);
// }

// function handleAvatarFormSubmit(evt) {
//   function makeRequest() {
//     return setAvatar(avatarLinkInput.value).then((user) => {
//       avatar.src = user.avatar;
//       closePopup(popupAvatar);
//     });
//   }
//   handleSubmit(makeRequest, evt);
// }

// function handleCardFormSubmit(evt) {
//   const item = {
//     name: nameCardInput.value,
//     link: linkCardInput.value,
//   };
//   function makeRequest() {
//     return postCard(item).then(res => {
//       elements.prepend(createCard(res));
//       closePopup(popupCard);
//     });
//   }
//   handleSubmit(makeRequest, evt);
// };

const userFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error'
}, document.forms['user']);

userFormValidator.enableValidation();

const cardFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error'
}, document.forms['card']);

cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator({
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error'
}, document.forms['avatar']);

avatarFormValidator.enableValidation();
