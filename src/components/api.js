export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
  };

  getUser() {
    return this._request(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
  };

  setAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
  };

  setProfile(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
  };

  createCard(card) {
    return this._request(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(card)
      })
  };

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify(card)
      })
  };

  setLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
  };

  deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
  }

  
  _request(url, options) {
    return fetch(url, options).then(this._onResponse)
  }


  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

}