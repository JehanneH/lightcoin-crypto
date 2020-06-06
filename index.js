
class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value
    }
    return balance;

  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account(`Jehanne's account`);

console.log('Starting Balance', myAccount.balance);

console.log('Attempt to withdraw $1 should fail');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance:', myAccount.balance);

console.log('Deposit should succeed');
const t2 = new Deposit(10.00, myAccount);
console.log('commit result:', t2.commit());
console.log('New Account Balance:', myAccount.balance);

console.log('Withdrawel for 10.00 should be allowed');
const t3 = new Withdrawal(10.00, myAccount);
console.log('commit result:', t3.commit());

console.log('Final account Balance: ', myAccount.balance);

console.log('transaction history', myAccount.transactions)


