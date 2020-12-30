import jwt from 'jsonwebtoken';

(function main() {
  const username = document.querySelector('input[name="username"]');
  const password = document.querySelector('input[name="password"]');
  const loginButton = document.querySelector('button[name="btn-login"]');
  const message = document.querySelector('.actions__message');

  const showYearInTheFooter = () => {
    const year = document.querySelector('.main-footer__copyright').innerHTML.replace('$year', `${new Date().getFullYear()}`);

    document.querySelector('.main-footer__copyright').innerHTML = year;
  };

  showYearInTheFooter();

  const validationHandling = () => {
    let theMessage = '';

    if (!username.value) {
      theMessage = 'Please enter the username!';
    }

    if (!password.value) {
      theMessage = 'Please enter the password!';
    }

    message.innerHTML = theMessage;

    if (username.value && password.value) {
      theMessage = '';

      return true;
    }
    return false;
  };

  console.log(jwt);

  loginButton.addEventListener('click', () => {
    const isValidData = validationHandling();

    console.log(username.value, password.value);
  });
}());
