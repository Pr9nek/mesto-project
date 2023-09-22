export default class UserInfo {
    constructor(name, about, avatar) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._nameElement = document.querySelector(this._name);
        this._aboutElement = document.querySelector(this._about);
        this._avatarElement = document.querySelector(this._avatar);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        }
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
    }

    setUserAvatar(src) {
        this._avatarElement.src = src;
    }
}