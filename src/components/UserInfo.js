export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userJob = document.querySelector(this._userJobSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userName.textContent;
    this._userInfo.about = this._userJob.textContent;
    return this._userInfo;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.name;
    this._userJob.textContent = newUserData.about;
  }

  setUserId(newUserData) {
    this._userId = newUserData['_id'];
  }

  getUserId() {
    return this._userId;
  }

}
