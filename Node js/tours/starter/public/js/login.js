/*eslint-disable*/

import { showAlert, hideAlert } from './alert';

// document.querySelector('.form').addEventListener('submit', async e => {
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   await login(email, password);
// });

export const login = async (email, password) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  };

  try {
    const response = await fetch(
      'http://localhost:3000/api/v1/user/login',
      options
    );

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    if (data.status === 'success') {
      showAlert('success', 'login successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
    console.log(data);
  } catch (error) {
    showAlert('error', data.message);
  }
};

export const logOut = async () => {
  try {
    console.log('i am hited')
    const options = {
      method: 'POST'
    };
    const response = await fetch(
      'http://localhost:3000/api/v1/user/logout',
      options
      );
      console.log('i am hited')
      
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    const data =await response.json();
    console.log(data);
    console.log(data);
    if (data === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'error in logout');
  }
};
