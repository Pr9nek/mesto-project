export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(this._onResponse);
  };

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then(this._onResponse);
  };

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._onResponse);
  };

  setProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(this._onResponse);
  };

  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(card)
      })
      .then(this._onResponse);
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify(card)
      })
      .then(this._onResponse);
  };

  setLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._onResponse);
  };

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._onResponse);
  }

  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

}