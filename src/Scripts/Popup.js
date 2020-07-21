export class Popup {
    constructor(popup, listenerClose, listenerOpen, ) {
        this.popup = popup;
        this._listenerOpen = listenerOpen;
        this._listenerClose = listenerClose;


        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addListeners = this.addListeners.bind(this);

    }
    open() {
        this.popup.classList.toggle('popup_is-opened');
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
    showDownload(isLoad) {
        const button = this.popup.querySelector('.button');
        let buttonText = '';
        if (this.popup.classList.contains('popup-add-card')) {
            buttonText = '+';
        }
        if (this.popup.classList.contains('popup-edit-card') || this.popup.classList.contains('popup-avatar')) {
            buttonText = 'Сохранить'
        }
        if (isLoad) {
            button.textContent = 'Загрузка...'
            button.removeAttribute('disabled');
        }
        else {
            button.textContent = buttonText;
            button.setAttribute('disabled', true);
        }

    }
    addListeners() {
        if (this._listenerOpen) {
            this._listenerOpen.addEventListener('click', this.open);
        }
        this._listenerClose.addEventListener('click', this.close);
    }
}