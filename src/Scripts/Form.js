class Form {
  constructor(argList) {
    this._obj = argList.popupCard;
    this._cardTitle = argList.cardTitle;
    this._cardLink = argList.cardLink;
    this._createNewCard = argList.createNewCard;
    this._addCard = argList.cardAdd;
    this._closePopup = argList.closePopup;
    this._popupForm = this._obj.popup.querySelector('.popup__form');
    this._openImage = argList.openImage;
    this._api = argList.api;


    this.createCard = this.createCard.bind(this);
    this.setListeners = this.setListeners.bind(this);
  }
  // создать карточку из формы
  createCard(event) {

    // отмена действия по умолчанию
    event.preventDefault();
    // получить данные от пользователя
    this._api.sendCard(this._cardTitle.value, this._cardLink.value)
      .then((data) => {
        this._obj.showDownload(true);
        // записать разметку в переменную
        const template = this._createNewCard(data, this._openImage, this._api);
        template.create()
        template.setListeners()
        // добавить разметку на страницу
        this._addCard(template.card);
        //  сбросить данные в форме
        this._popupForm.reset();
        // закрыть форму по отправке
        this._closePopup();
      })
      .catch((err) => {
        console.log(`Упс, ошибочка вышла, ${err}`)
      })
      .finally(() => {
        this._obj.showDownload(false);
      })
  }


  setListeners() {
    this._obj.popup.addEventListener('submit', this.createCard);
  };
}