export default class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerResponseStatus(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  renewUserInfo(newUserInfoData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserInfoData.name,
        about: newUserInfoData.about
      })
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  createNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }

  setNewAvatar(newAvatarData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarData.link
      })
    })
      .then(this._checkServerResponseStatus)
      .catch(err => Promise.reject(err));
  }


}

