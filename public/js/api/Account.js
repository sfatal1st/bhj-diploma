/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  constructor() {
    this.URL = '/account';
  }

  static get(id = '', callback){
    createRequest({
      url: '/account' + '/' + id,
      method: 'GET',
      responseType: 'json',
      //data,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}
