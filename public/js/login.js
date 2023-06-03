const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#newUsername').value.trim();
  const password = document.querySelector('#password1').value.trim();
  const vfyPassword = document.querySelector('#password2').value.trim();

  if (password !== vfyPassword) {
    window.alert('Passwords Must Match!')
    return
  }
  if (username && password && vfyPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('response ok')
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signupSubmit = document.getElementById('signupSubmit')
signupSubmit.addEventListener('click', signupFormHandler);

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  console.log('line 37')
  if (username && password) {
    console.log('line 39')
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
      console.log('ok')
    } else {
      alert(response.statusText);
      console.log('not ok')
    }
  }
  console.log('is this thing on?')
};

const loginSubmit = document.getElementById('loginSubmit')
loginSubmit.addEventListener('click', loginFormHandler);
