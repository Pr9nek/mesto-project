const activeLikeClass = 'elements__like_active';
const myId = "c284fc2d348c95481b25c574";

export default class Card {
    constructor(item, selector, setLike, deleteLike, deleteCard, handleCardClick) {
        this._item = item;
        this._selector = selector;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
        this._deleteCard = deleteCard;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.elements__card')
        .cloneNode(true);

        return cardElement;
    }

    createCard() {
        this._element = this._getElement();
        const cardPhoto = this._element.querySelector('.elements__photo');
        const cardSignature = this._element.querySelector('.elements__signature');
        const likeButton = this._element.querySelector('.elements__like');
        const trashButton = this._element.querySelector('.elements__del');
        const likeCounter = this._element.querySelector('.elements__like-counter');
    
        cardPhoto.src = this._item.link;
        cardPhoto.alt = this._item.name;
        cardSignature.textContent = this._item.name;
        likeCounter.textContent = this._item.likes.length;

        this._setEventListeners(likeButton, trashButton, likeCounter, cardPhoto);
    
        if (this._item.owner._id !== myId) {
            trashButton.remove();
        }

        // проставляем активный лайк, если там есть наш
        if (this._item.likes.length > 0 && this._item.likes.find(like => like._id === myId)) {
            likeButton.classList.add(activeLikeClass);
        }

        return this._element;
    }

    _setEventListeners(likeButton, trashButton, likeCounter, cardPhoto) {
        trashButton.addEventListener('click', () => {
			this._deleteCard()
                .then(() => this._element.remove())
                .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                });
		});

        likeButton.addEventListener('click', (evt) => {
            if (this._item.likes.length === 0 || !this._item.likes.find(like => like._id === myId)) {
			    this._setLike()
                    .then((card) => {
                        this._item.likes = card.likes;
                        evt.target.classList.add(activeLikeClass);
                        likeCounter.textContent = card.likes.length;
                        item = JSON.parse(JSON.stringify(card));
                    })
                    .catch((err) => {
                        console.log(err); // выводим ошибку в консоль
                    });
            }
            else {
                this._deleteLike()
                    .then((card) => {
                        this._item.likes = card.likes;
                        evt.target.classList.remove(activeLikeClass);
                        likeCounter.textContent = card.likes.length;
                        item = JSON.parse(JSON.stringify(card));
                    })
                    .catch((err) => {
                        console.log(err); // выводим ошибку в консоль
                    });
            }
		});

        cardPhoto.addEventListener('click', () => this._handleCardClick());
	}
}