const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
        authorization: 'c7066d33-af2e-4ab1-9be7-8983d9995740',
        'Content-Type': 'application/json'
    }
};

function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(onResponse);
};

export const setAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({avatar})
  })
  .then(onResponse);
};

export const setProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }) 
    .then(onResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(onResponse);
  };

export const createCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then(onResponse);
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify(card)
    })
    .then(onResponse);
};

export const setLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    }) 
    .then(onResponse);
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    }) 
    .then(onResponse);
}

