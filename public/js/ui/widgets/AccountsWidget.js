/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element || alert('Элемент не передан!');
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount');
      App.modals.createAccount.open();
    });  
    //for (let i = 0; i < this.element.querySelectorAll('.account').length; i++) {
    //  console.log(this.element.querySelectorAll('.account')[i].classList);
    //  this.element.querySelectorAll('.account')[i].addEventListener('click', (event) => {
    //    event.preventDefault();
    //    this.onSelectAccount(this.element.querySelectorAll('.account')[i]);
    //  })   
    //}
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      Account.list('', (err, response) => {
        if (response && response.success) {
          this.clear();
          this.renderItem(response.data);
        } else if (response) {
          alert(response.error);
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    for (let item of this.element.querySelectorAll('.account')) {
       item.remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element, item) {
    element.addEventListener('click', () => {
      for (let elem of this.element.querySelectorAll('.account')) {
        elem.classList.remove('active');
      }
      element.classList.add('active');
      App.showPage('transactions', {account_id: item.id});
    })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    let li = document.createElement('li');
    let a = document.createElement('a');
    let spanOne = document.createElement('span');
    let spanTwo = document.createElement('span');

    li.classList.add('account');
    li.setAttribute('data-id', item.id);
    a.href = '#';
    spanOne.append(item.name);
    spanTwo.append(item.sum);
    a.appendChild(spanOne);
    a.append(' / ');
    a.appendChild(spanTwo);
    a.append(' ₽');
    li.appendChild(a);
    return li;
    //return `
    //  <li class="account" data-id=${item.id}>
    //    <a href="#">
    //      <span>${item.name}</span> /
    //      <span>${item.sum} ₽</span>
    //    </a>
    //  </li>
    //`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    for (let item of data) {
      //this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(item));
      let account = this.getAccountHTML(item);
      //account.addEventListener('click', () => {
        //event.preventDefault();
      this.onSelectAccount(account, item);
      //})  
      this.element.insertAdjacentElement('beforeend', account);
    }
  }
}
