class Card {

    constructor(obj, openImage, api) {
        this._obj = obj;
        this._api = api;

        this._openImage = openImage;


        this.create = this.create.bind(this);
        this._remove = this._remove.bind(this);
        this._like = this._like.bind(this);
        this.setListeners = this.setListeners.bind(this);
        this._removeListeners = this._removeListeners.bind(this);

    }
    // добавить новую карточку, принимает на вход объект с данными
    create() {
        // создать разметку карточки
        const cardItem = document.createElement('div');
        cardItem.classList.add('place-card');


        const cardImage = document.createElement('div');
        cardImage.classList.add('place-card__image');
        // берем фоновое изображение из массива
        cardImage.style.backgroundImage = `url('${this._obj.link}')`;
        // устанавливаем атрибут с адресом изображения
        cardImage.dataset.url = this._obj.link;
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('place-card__delete-icon');

        if (this._obj.owner._id !== "4a0ea2320e1b1a940a6b0942") {
            buttonDelete.classList.add("place-card__delete-icon_hidden");
        }

        const cardDescription = document.createElement('div');
        cardDescription.classList.add("place-card__description");

        const cardName = document.createElement('h3');
        cardName.classList.add("place-card__name");
        // берем заголовок из массива
        cardName.textContent = this._obj.name;

        const likeGroup = document.createElement('div');
        likeGroup.classList.add("place-card__like-group");

        const buttonLike = document.createElement('button');
        buttonLike.classList.add("place-card__like-icon");

        this._obj.likes.forEach((arr) => {
            if (arr._id === '4a0ea2320e1b1a940a6b0942') {
                buttonLike.classList.add("place-card__like-icon_liked");
            }
        })

        const likeCounter = document.createElement('p');
        likeCounter.classList.add("place-card__like-counter");
        likeCounter.textContent = this._obj.likes.length;

        likeGroup.appendChild(buttonLike);
        likeGroup.appendChild(likeCounter);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeGroup);
        cardImage.appendChild(buttonDelete);
        cardItem.appendChild(cardImage);
        cardItem.appendChild(cardDescription);

        this.card = cardItem;

        return cardItem;
    };
    // удалить карточку
    _remove(event) {
        event.stopPropagation();
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            this._removeListeners();
            const card_id = this._obj._id;
            this._api.deleteCard(card_id)
                .then(() => {
                    this.card.remove();
                    this.card = null;
                })
                .catch((err) => {
                    console.log(`Упс, ошибочка вышла, ${err}`)
                })
        }

    };

    // снять и поставить лайк
    _like(event) {
        
        const likeCounter = this.card.querySelector('.place-card__like-counter');
        // если лайк есть
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this._api.dislikeCard(this._obj._id)
                .then((data) => {
                    event.target.classList.remove('place-card__like-icon_liked');
                    likeCounter.textContent = (data.likes.length);
                })
                .catch((err) => {
                    console.log(`Упс, ошибочка вышла, ${err}`)
                })
        }
        this._api.likeCard(this._obj._id)
            .then((data) => {
                event.target.classList.add('place-card__like-icon_liked');
                likeCounter.textContent = (data.likes.length);
            })
            .catch((err) => {
                console.log(`Упс, ошибочка вышла, ${err}`)
            })
        
    };
    // установка слушателей на карточку
    setListeners() {
        // слушатель на удаление
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        // Слушатель на лайк
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        // Слушатель на попап с картинкой
        this.card.querySelector('.place-card__image').addEventListener('click', this._openImage);
    }
    _removeListeners() {
        this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        this.card.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this.card.querySelector('.place-card__image').removeEventListener('click', this._openImage);
    }
}
