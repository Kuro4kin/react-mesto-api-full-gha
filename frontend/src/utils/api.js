const BASE_URL = 'http://api.mesto.kurochkin.nomoredomains.work';

class Api {
  constructor(config) {
    this._config = config;
  }

  _getResponseData(res) {
    if (!res.ok) {
      Promise.reject(res.status);
    } else {
      return res.json();
    }
  }

  getInitialUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },  
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${BASE_URL}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      }, 
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editUserAvatar(data) {
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  createNewCard(data) {
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._likeThisCard(cardId)
    } else {
      return this._unlikeThisCard(cardId)
    }
  }

  _likeThisCard(cardId) {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _unlikeThisCard(cardId) {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  removeThisCard(card) {
    return fetch(`${BASE_URL}/cards/${card._id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api();
