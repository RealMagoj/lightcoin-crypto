// let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((acc, val) => {
      return acc + val.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(account, amount) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    return this.amount <= this.account.balance;
  }

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Balance:', myAccount.balance);
t3 = new Deposit(myAccount, 120.00);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
t1 = new Withdrawal(myAccount, 50.25);
t1.commit();
console.log('Transaction 1:', t1);

console.log('Balance:', myAccount.balance);
t2 = new Withdrawal(myAccount, 9.99);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);
