import {
    setLike,
    deleteLike,
    deleteCard
} from './api';
import {
    openPopup
} from '../components/modal';
import {
    userId
} from '.';

const openedPhoto = document.querySelector('.popup__photo');
const popupSign = document.querySelector('.popup__sign');
const cardTemplate = document.querySelector('#card').content;
const popupPhoto = document.querySelector('.photo-popup');
// const myId = "c284fc2d348c95481b25c574";
const aktiveLikeClass = 'elements__like_active';

export function createCard(item) {
    const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const cardPhoto = cardElement.querySelector('.elements__photo');
    const cardSignature = cardElement.querySelector('.elements__signature');
    const likeButton = cardElement.querySelector('.elements__like');
    const trashButton = cardElement.querySelector('.elements__del');
    const cardToTrash = trashButton.closest('.elements__card');
    const likeCounter = cardElement.querySelector('.elements__like-counter');

    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    cardSignature.textContent = item.name;
    likeCounter.textContent = item.likes.length;

    if (item.owner._id !== userId) {
        trashButton.remove();
    } else {
        trashButton.addEventListener('click', function () {
            deleteCard(item._id)
                .then(() => cardToTrash.remove())
                .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                });
        });
    }
    // проставляем активный лайк, если там есть наш
    if (item.likes.length > 0 && item.likes.find(like => like._id === userId)) {
        likeButton.classList.add(aktiveLikeClass);
    }

    likeButton.addEventListener('click', function (evt) {
        if (item.likes.length === 0 || !item.likes.find(like => like._id === userId)) {
            setLike(item._id)
                .then((card) => {
                    evt.target.classList.add(aktiveLikeClass);
                    likeCounter.textContent = card.likes.length;
                    item = JSON.parse(JSON.stringify(card));
                })
                .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                });
        } else {
            deleteLike(item._id)
                .then((card) => {
                    evt.target.classList.remove(aktiveLikeClass);
                    likeCounter.textContent = card.likes.length;
                    item = JSON.parse(JSON.stringify(card));
                })
                .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                });
        }
    });

    cardPhoto.addEventListener('click', function () {
        openPopup(popupPhoto);
        popupSign.textContent = item.name;
        openedPhoto.src = item.link;
        openedPhoto.alt = item.name;
    });

    return cardElement;
}