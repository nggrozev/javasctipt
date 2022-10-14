'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const wrongCredentialsMessage = document.querySelector('.wrong_credentials');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const date = new Date();
const day = String(date.getDate()).padStart(2, 0);
const month = String(date.getMonth()).padStart(2, 0);
const year = date.getFullYear();
const hour = date.getHours();
const min = date.getMinutes();
const displayDate = `${day}/${+month + 1}/${year}`;

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const dateMoves = new Date(acc.movementsDates[i]);
    const day = String(dateMoves.getDate()).padStart(2, 0);
    const month = String(dateMoves.getMonth()).padStart(2, 0);
    const year = dateMoves.getFullYear();
    const displayDateMoves = `${day}/${+month + 1}/${year}`;
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDateMoves}</div>
          <div class="movements__value">${Math.abs(mov).toFixed(2)}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const dateNow = new Date();
labelDate.textContent = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;

const calcDisplaySummery = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const spendings = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(spendings).toFixed(2)}€`;

  const intrerest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrerest.toFixed(2)}€`;
};

const createUsenames = accs => {
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name.slice(0, 1))
        .join(''))
  );
};
createUsenames(accounts);

const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplaySummery(acc.movements);
  calcDisplayBalance(acc);
};

let currentAccount;
////FAKE LOGIN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Wellcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    labelDate.textContent = `${day}/${+month + 1}/${year}, ${hour}:${min}`;
    wrongCredentialsMessage.style.display = 'none';
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  } else {
    wrongCredentialsMessage.style.display = 'block';
  }
  inputLoginPin.blur();
  inputLoginUsername.blur();
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username &&
    receiverAccount
  ) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movements.push(amount);
    receiverAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (a) {
  a.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
//////////////////////////

setTimeout(() => console.log('Here is your pizza 🍕🍕🍕'), 5000);
