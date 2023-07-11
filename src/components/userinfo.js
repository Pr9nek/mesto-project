export default class UserInfo {
  constructor({ nameSelector, infoSelector }, api) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
      this._api = api;
  }


  getUserInfo() {
      return this._api.getUser();
  }

  setUserInfo( name, info ) {
    this._api.setProfile( name, info )
      .then(() => {
        this._nameElement.textContent = name;
        this._infoElement.textContent = info;
      })
      .catch((error) => {
        console.error('Error updating user info:', error);
      });
  }
}
