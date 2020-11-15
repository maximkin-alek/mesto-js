import { Api } from "./Api";
import { Card } from "./Card";
import { CardList } from "./CardList";
import { Form } from "./Form";
import { FormValidator } from "./FormValidator";
import { UserInfo } from "./UserInfo";
import { Popup } from "./Popup";
import { PopupImage } from "./PopupImage";
import "../pages/index.css";

// контейнер для карточек
const list = document.querySelector('.places-list');
// кнопка добавить карточку
const buttonAdd = document.querySelector('.user-info__button');
// форма добавления карточки
const cardPopup = document.querySelector('.popup-add-card');
// кнопка закрыть форму добавления
const buttonCloseFormAdd = document.querySelector('.popup-add-card__close');
// кнопка закрыть форму редактирования
const buttonCloseFormEdit = document.querySelector('.popup-edit-card__close');
// форма добавления карточки
const formAdd = document.querySelector('#form-add');
// форма редактирования карточки
const formEdit = document.querySelector('#form-edit');
// попап редактировать карточку
const editPopup = document.querySelector('.popup-edit-card');
// инпут имя
const cardTitle = document.querySelector('.popup__input_type_name');
// инпут ссылка на картинку
const cardLink = document.querySelector('.popup__input_type_link-url');
// кнопка редактировать карточку
const buttonEdit = document.querySelector('.user-info__edit-button');
// имя в форме редактирования
const formEditName = document.querySelector('.popup__input_type_author-name');
// информация о пользователе в форме редактирования
const formEditInfo = document.querySelector('.popup__input_type_info');
// имя пользователя
const userName = document.querySelector('.user-info__name');
// инфо пользователя
const userInfo = document.querySelector('.user-info__job');
// попап с картинкой
const imagePopup = document.querySelector('.popup-image');
// кнопка закрыть попап с картинкой
const buttonCloseImage = document.querySelector('.popup-image__close');
const errorMessages = {
  empty: 'Это обязательное поле',
  shortOrLong: 'Должно быть от 2 до 30 символов',
  notUrl: 'Здесь должна быть ссылка'
};
const avatar = document.querySelector('.user-info__photo');
const avatarPopup = document.querySelector('.popup-avatar');
const buttonCloseAvatar = document.querySelector('.popup-avatar__close');
const formAvatar = document.querySelector('#form-avatar');
const formAvatarLink = document.querySelector('.popup-avatar_type_link-url');

const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const key = '08592843-ad5c-47f3-9530-a9ac7ac430b9';
const url = `${API_URL}/cohort11`
const api = new Api(key, url);
const userDataPromise = api.getUserData();
userDataPromise
  .then((data) => {
    userName.textContent = data.name;
    userInfo.textContent = data.about;
    avatar.style.backgroundImage = `url('${data.avatar}')`;

    const userData = new UserInfo(userName, userInfo, api);

    buttonEdit.addEventListener('click', () => {
      formEditName.value = userName.textContent;
      formEditInfo.value = userInfo.textContent;

      userData.setUserInfo(userName.textContent, userInfo.textContent);
    });

    popupEdit.popup.addEventListener('submit', (event) => {
      popupEdit.showDownload(true);
      event.preventDefault();
      userData.setUserInfo(formEditName.value, formEditInfo.value);
      userData.updateUserInfo()
        .then(() => {
          popupEdit.close();
        })
        .catch((err) => {
          console.log(`Упс, ошибочка вышла, ${err}`)
        })
        .finally(() => {
          popupEdit.showDownload(false);
        })
    })
  })
  .catch((err) => {
    console.log(`Упс, ошибочка вышла, ${err}`)
  })


// создаем инстанс для передачи другому классу
const createNewCard = (...arg) => new Card(...arg);
const newPopup = (...arg) => new Popup(...arg);
const popupImage = new PopupImage(imagePopup, buttonCloseImage, undefined, newPopup)
const openImage = popupImage.openImage;

const cardList = new CardList(list, api, createNewCard, openImage);
cardList.render();

// попап добавить карточку
const popupCard = new Popup(cardPopup, buttonCloseFormAdd, buttonAdd);
popupCard.addListeners()

// попар редактировать карточку
const popupEdit = new Popup(editPopup, buttonCloseFormEdit, buttonEdit);
popupEdit.addListeners()
const cardAdd = cardList.addCard;
const closePopup = popupCard.close;

const popupAvatar = new Popup(avatarPopup, buttonCloseAvatar, avatar);
popupAvatar.addListeners();
popupAvatar.popup.addEventListener('submit', (event) => {
  event.preventDefault();
  const link = formAvatarLink.value;
  popupAvatar.showDownload(true);
  api.updateAvatar(link)
    .then((data) => {
      avatar.style.backgroundImage = `url('${data.avatar}')`;
      formAvatar.reset();
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`Упс, ошибочка вышла, ${err}`)
    })
    .finally(() => {
      popupAvatar.showDownload(false);
    })
});

const argList = { popupCard, cardTitle, cardLink, createNewCard, cardAdd, closePopup, openImage, api };
const formAddCard = new Form(argList);
formAddCard.setListeners();

new FormValidator(formEdit, errorMessages, buttonCloseFormEdit);
new FormValidator(formAdd, errorMessages, buttonCloseFormAdd);
new FormValidator(formAvatar, errorMessages, buttonCloseAvatar);
