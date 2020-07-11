class PopupImage extends Popup {
    constructor(popup, listenerClose, listenerOpen, newPopup) {
        super(popup, listenerClose, listenerOpen)
        this._newPopup = newPopup;

        this.openImage = this.openImage.bind(this);
        
    }
    // При клике на картинку создаёт экземпляр попапа с картинкой, передаёт ему кнопку закрытия
  openImage(event) {
    const popupImage = this._newPopup(this.popup, this._listenerClose);
    popupImage.open();
    popupImage.addListeners();
    const cardPicture = event.target;
    const popupPicture = popupImage.popup.querySelector('.popup-image__picture')
    const url = cardPicture.dataset.url;
    // передаем адрес
    popupPicture.setAttribute('src', url);
  };
}