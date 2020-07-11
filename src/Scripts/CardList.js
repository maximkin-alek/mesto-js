class CardList {
    constructor(elem, api, createNewCard, openImage) {
        this._elem = elem;
        this._api = api;
        this._createNewCard = createNewCard;
        this._openImage = openImage;

        this.addCard = this.addCard.bind(this);
    }

    addCard(card) {
        this._elem.appendChild(card);
    }


    // Функция рендера массива, содержащего объекты с карточками
    render() {
        this._api.getCards().
            then((data) => {
                data.forEach((obj) => {
                    const template = this._createNewCard(obj, this._openImage, this._api);
                    template.create();
                    template.setListeners();
                    this.addCard(template.card)
                })
            })
            .catch((err) => {
                console.log(`Упс, ошибочка вышла, ${err}`)
            })
    };
}