export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }, apiInfo, apiSetInfo) {
      this._nameElement = nameSelector;
      this._infoElement = infoSelector;
      this._avatarElement = avatarSelector;
      this._apiInfo = apiInfo;
      this._apiSetInfo = apiSetInfo;
  }


  getUserInfo() {
    //  return this._api;
    const avatar = this._avatarElement;
    const user = this._nameElement;
    const status = this._infoElement ;
    let userId;
    this._apiInfo()
      .then((data) => {
        avatar.src = data.avatar;
        user.textContent = data.name;
        status.textContent = data.about;
        userId = data._id;
      })
      .catch((err) => {
          console.log(err); // выводим ошибку в консоль
      });
  }

  setUserInfo( name, info ) {
    this._apiSetInfo( name, info )
      .then(() => {
        this._nameElement.textContent = name;
        this._infoElement.textContent = info;
      })
      .catch((error) => {
        console.error('Error updating user info:', error);
      });
  }
}
