export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = document.querySelector(this._userNameSelector).textContent;
    this._userInfo.job = document.querySelector(this._userJobSelector).textContent;
    return this._userInfo;
  }

  setUserInfo(newUserData) {
    document.querySelector(this._userNameSelector).textContent = newUserData.name;
    document.querySelector(this._userJobSelector).textContent = newUserData.job;
  }

}
