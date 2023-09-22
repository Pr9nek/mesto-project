const activeLikeClass = 'elements__like_active';

export default class Card {
    constructor(item, selector, setLike, deleteLike, deleteCard, handleCardClick, userId) {
        this._item = item;
        this._selector = selector;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
        this._deleteCard = deleteCard;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
    }

    _getElement() {
        this._cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.elements__card')
        .cloneNode(true);

        return this._cardElement;
    }

    createCard() {
        this._element = this._getElement();
        this._cardPhoto = this._element.querySelector('.elements__photo');
        this._cardSignature = this._element.querySelector('.elements__signature');
        this._likeButton = this._element.querySelector('.elements__like');
        this._trashButton = this._element.querySelector('.elements__del');
        this._likeCounter = this._element.querySelector('.elements__like-counter');
    
        this._cardPhoto.src = this._item.link;
        this._cardPhoto.alt = this._item.name;
        this._cardSignature.textContent = this._item.name;
        this._likeCounter.textContent = this._item.likes.length;

        this._setEventListeners(this._likeButton, this._trashButton, this._likeCounter, this._cardPhoto);
    
        if (this._item.owner._id !== this._userId) {
            this._trashButton.remove();
        }

        // проставляем активный лайк, если там есть наш
        if (this._item.likes.length > 0 && this._item.likes.find(like => like._id === this._userId)) {
            this._likeButton.classList.add(activeLikeClass);
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
            if (this._item.likes.length === 0 || !this._item.likes.find(like => like._id === this._userId)) {
			    this._setLike()
                    .then((card) => {
                        this._item.likes = card.likes;
                        evt.target.classList.add(activeLikeClass);
                        likeCounter.textContent = card.likes.length;
                        this._item = JSON.parse(JSON.stringify(card));
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
                        this._item = JSON.parse(JSON.stringify(card));
                    })
                    .catch((err) => {
                        console.log(err); // выводим ошибку в консоль
                    });
            }
		});

        cardPhoto.addEventListener('click', () => this._handleCardClick());
	}
}