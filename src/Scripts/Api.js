export class Api {
    constructor(key, url) {
        this._key = key;
        this._url = url;
    }

    _handlePromise(res) {
        
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        
    }

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._key
            }
        })
            .then((res) => this._handlePromise(res))

    }
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._key
            }
        })
            .then((res) => this._handlePromise(res))
    }

    editProfile(authorName, authorAbout) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: authorName,
                about: authorAbout
            })
        })
            .then((res) => this._handlePromise(res))
    }

    sendCard(cardName, cardLink) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then((res) => this._handlePromise(res))
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key,
            },
        })
            .then((res) => this._handlePromise(res))
    }

    likeCard(id) {
        return fetch(`${this._url}/cards/like/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._key,
            },
        })
            .then((res) => this._handlePromise(res))
    }

    dislikeCard(id) {
        return fetch(`${this._url}/cards/like/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._key,
            },
        })
            .then((res) => this._handlePromise(res))
    }

    updateAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => this._handlePromise(res))
    }

}