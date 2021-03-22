export default class Card {
  constructor(data, cardSelector, {ownerId, handleCardClick, handleDeleteIconClick, handleLikeButtonClick}) {
    this._cardImageName = data.name;
    this._cardImageLink = data.link;
    this._cardOwnerId = data.owner['_id'];
    this._cardId = data['_id'];
    this._cardLikes = data.likes;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

      return cardElement;
  }

  hasUserLiked (likesArray, myUserId) {
    return likesArray.some((userPutLike) => {
      return userPutLike['_id'] === myUserId;
    });
  }

  getLikesField() {
    return this._cardLikes;
  }

  setLikesField(newCardData) {
    this._cardLikes = newCardData.likes;
  }

  setLikeCounter(likesArray) {
    this._likeCountElement.textContent = likesArray.length;
  }

  toggleLikeButtonState(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  generateCard() {
    this._element = this._getTemplate();

    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__delete-button');

    //search for the like xounter inside this particular card element only
    this._likeCountElement = this._element.querySelector('.elements__like-count');
    this.setLikeCounter(this._cardLikes);

    //during the first render, show the likes that were put by me during the previous session
    if(this.hasUserLiked(this._cardLikes, this._ownerId)) {
      likeButton.classList.add('elements__like-button_active');
    }

    //show delete icons only for the cards created by me, remove icon - for the rest
    if(this._cardOwnerId !== this._ownerId) {
      deleteButton.remove();
    }

    const cardImage = this._element.querySelector('.elements__image');
    const cardImageName = this._element.querySelector('.elements__title');

    //filling the card's elements with contents
    cardImage.src = this._cardImageLink;
    cardImage.alt = `Изображение ${this._cardImageName}`;
    cardImageName.textContent = this._cardImageName;

    this._setCardEventListeners(likeButton, deleteButton, cardImage);

    return this._element;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setCardEventListeners(likeButtonElement, deleteButtonElement, cardElement) {

    likeButtonElement.addEventListener('click', (evt) => {
      this._handleLikeButtonClick(evt);
    });

    deleteButtonElement.addEventListener('click', () => {
     this._handleDeleteIconClick();
    });

    cardElement.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
