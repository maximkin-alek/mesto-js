class UserInfo {
    // Принимает элементы с данными пользователя
    constructor(userName, userInfo, api) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._api = api;
        this._name = null;
        this._about = null;

        this.setUserInfo = this.setUserInfo.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    // записать данные в форму
    setUserInfo(name, about) {
        this._name = name;
        this._about = about;
    }
    // вывести данные на страницу
    updateUserInfo() {
        return this._api.editProfile(this._name, this._about)
            .then((data) => {
                this._userName.textContent = data.name;
                this._userInfo.textContent = data.about;
            })
            .catch((err) => {
                console.log(`Упс, ошибочка вышла, ${err}`)
            })
    }
}
