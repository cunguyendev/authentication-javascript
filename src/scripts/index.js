import jwt from 'jsonwebtoken';

(function main() {
  const username = document.querySelector('input[name="username"]');
  const password = document.querySelector('input[name="password"]');
  const loginButton = document.querySelector('button[name="btn-login"]');
  const message = document.querySelector('.actions__message');
  const dataInputLayout = document.querySelector('.data-input');

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

  loginButton.addEventListener('click', () => {
    if (dataInputLayout.style.display === 'none') {
      localStorage.removeItem('token');
    } else {
      const isValidData = validationHandling();

      if (isValidData) {
        const token = jwt.sign({
          username: username.value,
          password: password.value,
        }, 'secret');

        localStorage.setItem('token', token);
      }
    }

    document.location.reload();
  });

  jwt.verify(localStorage.getItem('token'), 'secret', (err, decoded) => {
    if (decoded && decoded.username) {
      message.innerHTML = `Hello ${decoded.username}`;
      loginButton.textContent = 'Logout';
      dataInputLayout.style.display = 'none';
    } else {
      message.innerHTML = '';
      loginButton.textContent = 'Login';
      dataInputLayout.removeAttribute('style');
    }
  });
}());
