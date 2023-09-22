import Api from './api';
import Card from './card';
import PopupWithImage from './popup-with-image';
import PopupWithForm from './popup-with-form';
import Section from './section';
import FormValidator from './form-validator';
import UserInfo from './user-info';
import '../pages/index.css';
import { popupInfoButton, popupCardButton, popupButtonAvatar, elementsSelector } from '../utils/constants';
let userId;

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'c7066d33-af2e-4ab1-9be7-8983d9995740',
    'Content-Type': 'application/json'
  }
}); 

const myUser = new UserInfo(
  '.profile__user',
  '.profile__status',
  '.profile__avatar',
);

let section;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    myUser.setUserInfo(user);
    myUser.setUserAvatar(user.avatar);
    userId = user._id;
    section = new Section(
      {
        data: cards,
        renderer: (initialCard) => {
          const card = createCard(initialCard);
          section.addItem(card);
        }
      },
      elementsSelector
    );

    section.renderItems();
  })
  .catch((err) => {
    // в каждом запросе нужно ловить ошибку
    console.error(`Ошибка: ${err}`);
  });

function createCard(item) {
  // тут создаете карточку и возвращаете ее
      const card = new Card(
        item,
        '#card',
        () => api.setLike(item._id),
        () => api.deleteLike(item._id),
        () => api.deleteCard(item._id),
        () => popupPhoto.open(item.link, item.name),
        userId
      );

      const cardElement = card.createCard();
      return cardElement;
}
  
const popupCard = new PopupWithForm('.cards-popup', 
  (data) => {
    api.createCard({link: data.link, name: data.name})
      .then((cardData) => {
        popupCard.close()
        section.addItem(createCard(cardData));
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

const popupPhoto = new PopupWithImage('.photo-popup');
popupPhoto.setEventListeners();

const popupProfile = new PopupWithForm('.profile-popup', 
  (data) => {
    api.setProfile(data.name, data.about)
      .then(() => {
        myUser.setUserInfo(data);
        popupProfile.close()
      })
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
      .then((data) => {
        myUser.setUserAvatar(data.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
);

popupInfoButton.addEventListener('click', () => {
  popupProfile.open()
  popupProfile.setInfo(myUser.getUserInfo())
});
popupProfile.setEventListeners();

popupCardButton.addEventListener('click', () => popupCard.open());
popupCard.setEventListeners();

popupButtonAvatar.addEventListener('click', () => popupAvatar.open());
popupAvatar.setEventListeners();

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