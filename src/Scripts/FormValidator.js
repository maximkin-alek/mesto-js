export class FormValidator {
    constructor(form, errorMessages, buttonClose) {
        this._form = form;
        this._buttonClose = buttonClose;
        this._errorMessages = errorMessages;

        this._setEventListeners = this._setEventListeners.bind(this);
        this._checkInputValidity = this._checkInputValidity.bind(this);
        this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
        this._resetInputError = this._resetInputError.bind(this);

        this._setEventListeners();

    }
    _cleaner() {
        const errorsМessage = this._form.querySelectorAll('.error-messege')
        const errorsCustomValue = this._form.querySelectorAll('.popup__input')

        errorsМessage.forEach((elem) => {
            elem.textContent = '';
        });

        errorsCustomValue.forEach((elem) => {
            elem.setCustomValidity('');
        });
        ;
    }

    //сбрасывает ошибку поля, принимает элемент поля и элемент ошибки
    _resetInputError(input, error) {
        input.setCustomValidity('');
        error.textContent = '';
    }
    _setEventListeners() {
        const formElement = this._form;
        const currentButton = formElement.querySelector('.button');
        const inputs = Array.from(formElement.querySelectorAll('input'));
        this._buttonClose.addEventListener('click', () => {
            this._cleaner();
            formElement.reset();
            this.setSubmitButtonState(false, currentButton);
        });
        this._form.addEventListener('submit', () => this.setSubmitButtonState(false, currentButton));
        // На элемент формы ставится обработчик события input
        this._form.addEventListener('input', () => {

            let valid = true;
            inputs.forEach((elem) => {
                if (this._checkInputValidity(elem) == false) {
                    valid = false;
                }
                this.setSubmitButtonState(valid, currentButton)
            });
        });
    }
    // проверка одного поля, принимает элемент поля, проверяет на валидность, возвращает true/false
    _checkInputValidity(element) {
        const errorМessage = this._form.querySelector(`#error-${element.id}`);
        if (element.validity.valueMissing) {
            element.setCustomValidity(this._errorMessages.empty);
            errorМessage.textContent = element.validationMessage;
            return false;
        }
        if (element.validity.tooShort || element.validity.tooLong) {
            element.setCustomValidity(this._errorMessages.shortOrLong);
            errorМessage.textContent = element.validationMessage;
            return false;
        }
        if (element.validity.typeMismatch) {
            element.setCustomValidity(this._errorMessages.notUrl);
            errorМessage.textContent = element.validationMessage;
            return false;
        }
        this._resetInputError(element, errorМessage);
        return true;
    }
    //блокирует/разблокирует кнопку сабмита

    setSubmitButtonState(isValid, button) {
        if (!isValid) {
            button.setAttribute('disabled', true);
        }
        else {
            button.removeAttribute('disabled');
        }
    }
}