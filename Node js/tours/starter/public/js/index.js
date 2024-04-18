import '@babel/polyfill';
import { login, logOut } from './login';
import { updateSettings } from './updateSettings';

const loginForm = document.querySelector('.piko');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');

if (loginForm) {
  console.log('i am loginform');
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logOut);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('data fomm trigers')
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    console.log(name,email)
    await updateSettings( {name,email}, 'data');
  });
}
if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('Password-confirm');
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('Password-confirm').value = '';
}
