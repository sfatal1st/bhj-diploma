/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.expenseAccountsList = document.querySelector('#expense-accounts-list');
    this.incomeAccountsList = document.querySelector('#income-accounts-list');
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if (user) {
      Account.list('', (err, response) => {
        if (response && response.success) {
          response.data.forEach ((item) => {
              const options = `
                <option value="${item.id}">${item.name}</option>
              `;
              this.element.querySelector('.accounts-select').insertAdjacentHTML('beforeend', options);
            })
        } else if (response) {
          alert(response.error);
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        if (this.element.querySelector('#income-accounts-list')) {
          App.modals.newIncome.close();
        } else if (this.element.querySelector('#expense-accounts-list')) {
          App.modals.newExpense.close();
        }
        App.update();
      } else {
        alert(response.error);
      }
    });
  }
}