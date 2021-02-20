import {imagePopupOverlay, imageCaptionPopup, imagePopup, openPopupOverlay} from './utils.js';

export default class Card {
  constructor(data, cardSelector) {
    this._cardImageName = data.name;
    this._cardImageLink = data.link;
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

  //method to open the popup with the enlarged existing image and its full description
  _handlePreviewImage() {
    imageCaptionPopup.textContent = this._cardImageName;
    imagePopup.src = this._cardImageLink;
    imagePopup.alt = `Изображение ${this._cardImageName}`;
    openPopupOverlay(imagePopupOverlay);
  }

  _setCardEventListeners(likeButtonElement, deleteButtonElement, cardElement) {
    likeButtonElement.addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    cardElement.addEventListener('click', () => {
      this._handlePreviewImage();
    });
  }
}
