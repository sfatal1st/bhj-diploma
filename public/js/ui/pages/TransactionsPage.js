/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element || alert('Элемент не передан!');
    this.lastOptions = undefined;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    } else {
      this.render();
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => {
      this.removeAccount();
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (confirm('Вы действительно хотите удалить счёт?')) {
      if (this.lastOptions) {
        Account.remove(this.lastOptions.account_id, (err, response) => {
          if (response && response.success) {
            this.clear();
            App.updateWidgets();
            App.updateForms();
          } else if (response) {
            alert(response.error);
          }
        });
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove2(id, (err, response) => {
        if (response && response.success) {
          App.update();
        } else if (response) {
          alert(response.error);
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    this.lastOptions = options;
    if (options) {
      Account.get(options.account_id, (err, response) => {
        if (response && response.success) {
          this.renderTitle(response.data.name);
        } else if (response) {
          alert(response.error);
        }
      });
      Transaction.list2(options, (err, response) => {
        if (response && response.success) {       
          this.renderTransactions(response.data);
        } else if (response) {
          alert(response.error);
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = undefined;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const dateNew = new Date(date);
    const optionsDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
    };

    return dateNew.toLocaleString("ru", optionsDate) + ' в ' + dateNew.toLocaleString("ru", optionsTime);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let date = this.formatDate(item.created_at);
    let classTransaction;
    if (item.type === 'income') {
      classTransaction = 'transaction_income'
    } else {
      classTransaction = 'transaction_expense'
    };
    
    function createElem() {
      let divOne = document.createElement('div');
      let divTwo = document.createElement('div');
      let divThree = document.createElement('div');
      let divFour = document.createElement('div');
      let divFive = document.createElement('div');
      let divSix = document.createElement('div');
      let divSeven = document.createElement('div');
      let divEight = document.createElement('div');
      let spanOne = document.createElement('span');
      let spanTwo = document.createElement('span');
      let button = document.createElement('button');
      let h4 = document.createElement('h4');
      let i = document.createElement('i');

      divOne.classList.add('transaction', classTransaction, 'row');
      divTwo.classList.add('col-md-7', 'transaction__details');
      divThree.classList.add('transaction__icon');
      divFour.classList.add('transaction__info');
      divFive.classList.add('transaction__date');
      divSix.classList.add('col-md-3');
      divSeven.classList.add('transaction__summ');
      divEight.classList.add('col-md-2', 'transaction__controls');
      spanOne.classList.add('fa', 'fa-money', 'fa-2x');
      spanTwo.classList.add('currency');
      button.classList.add('btn', 'btn-danger', 'transaction__remove');
      h4.classList.add('transaction__title');
      i.classList.add('fa', 'fa-trash');

      divThree.append(spanOne);
      h4.append(item.name);
      divFive.append(date);
      divFour.appendChild(h4);
      divFour.appendChild(divFive);
      divTwo.appendChild(divThree);
      divTwo.appendChild(divFour);
      spanTwo.append('₽');
      divSeven.append(item.sum);
      divSeven.appendChild(spanTwo);
      divSix.appendChild(divSeven);
      button.setAttribute('data-id', item.id);
      button.appendChild(i);
      divEight.appendChild(button);
      divOne.appendChild(divTwo);
      divOne.appendChild(divSix);
      divOne.appendChild(divEight);
      return divOne;
    }

    return createElem();
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    this.element.querySelector('.content').innerHTML = '';
    data.forEach ((item) => {
      let transaction = this.getTransactionHTML(item);
      this.element.querySelector('.content').insertAdjacentElement('beforeend', transaction);
      transaction.addEventListener('click', () => {
        this.removeTransaction(item.account_id);
      });
    });
  }
}