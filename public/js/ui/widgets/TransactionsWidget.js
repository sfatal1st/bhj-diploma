/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.createIncomeButton = document.querySelector('.create-income-button');
    this.createExpenseButton = document.querySelector('.create-expense-button');
    this.element = element || alert('Элемент не передан!');
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.createIncomeButton.addEventListener('click', () => {
      App.getModal('newIncome');
      App.modals.newIncome.open();
    });
    this.createExpenseButton.addEventListener('click', () => {
      App.getModal('newExpense');
      App.modals.newExpense.open();
    });
  }
}
