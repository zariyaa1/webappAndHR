const LocalStorageService = (() => {
  const ACCESS_TOKEN = "accessToken";
  const ACCESS_TOKEN_EXPIRES = "accessTokenExpires";
  const REFRESH_TOKEN = "refreshToken";
  const REFRESH_TOKEN_EXPIRES = "refreshTokenExpires";
  const ID = "id";
  const DATE = "date";

  const _setToken = (tokenObj) => {
    localStorage.setItem(ACCESS_TOKEN, tokenObj.accessToken);

    localStorage.setItem(REFRESH_TOKEN, tokenObj.refreshToken);
  };

  const _setId = (id) => {
    localStorage.setItem(ID, id);
  };
  const _setdate = (date) => {
    localStorage.setItem(DATE, date);
  };

  const _getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
  };
  const _getAccessTokenTime = () => {
    return localStorage.getItem(ACCESS_TOKEN_EXPIRES);
  };
  const _getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
  };
  const _getRefreshTokenTime = () => {
    return localStorage.getItem(REFRESH_TOKEN_EXPIRES);
  };
  const _getId = () => {
    return localStorage.getItem(ID);
  };
  const _getDate = () => {
    return localStorage.getItem(DATE);
  };

  const _clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };
  return {
    setToken: _setToken,
    setId: _setId,
    getAccessToken: _getAccessToken,
    getAccessTokenTime: _getAccessTokenTime,
    getRefreshToken: _getRefreshToken,
    getRefreshTokenTime: _getRefreshTokenTime,
    clearToken: _clearToken,
    getID: _getId,
    getDate: _getDate,
    setDate: _setdate,
  };
})();

export default LocalStorageService;
