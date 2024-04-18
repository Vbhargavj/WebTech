document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('profileForm');
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const url = 'http://127.0.0.1:3000/api/v1/user/updateMe';
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    // Perform your update logic here (for demonstration purposes, we'll just log the values)
    console.log('Name:', name);
    console.log('Email:', email);
  });
});
