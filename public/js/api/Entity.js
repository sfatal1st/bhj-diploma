/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  constructor() {
    this.URL = '';
  }

  static list(data, callback){
    createRequest({
      url: '/account',
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }
  static list2(data, callback){
    createRequest({
      url: '/transaction',
      method: 'GET',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: '/account',
      method: 'PUT',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }

  static create2(data, callback) {
    createRequest({
      url: '/transaction',
      method: 'PUT',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: '/account',
      method: 'DELETE',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }
  static remove2(data, callback ) {
    createRequest({
      url: '/transaction',
      method: 'DELETE',
      responseType: 'json',
      data,
      callback: (err, response) => {
        //if (response && response.success) {
        //  return response.data;
        //}
        //return err;
        callback(err, response);
      }
    });
  }
}
