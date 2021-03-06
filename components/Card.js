export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._cardImageName = data.name;
    this._cardImageLink = data.link;
    this._handleCardClick = handleCardClick;
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

  generateCard() {
    this._element = this._getTemplate();

    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__delete-button');

    const cardImage = this._element.querySelector('.elements__image');
    const cardImageName = this._element.querySelector('.elements__title');

    //filling the card's elements with contents
    cardImage.src = this._cardImageLink;
    cardImage.alt = `Изображение ${this._cardImageName}`;
    cardImageName.textContent = this._cardImageName;

    this._setCardEventListeners(likeButton, deleteButton, cardImage);

    return this._element;
  }

  //'click' event handler for the like button
  _handleLikeButton(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  //'click' event handler for deleting the existing card
  _handleDeleteCard() {
    this._element.remove();
  }

  _setCardEventListeners(likeButtonElement, deleteButtonElement, cardElement) {
    likeButtonElement.addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    cardElement.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
