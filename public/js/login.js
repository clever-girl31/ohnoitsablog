const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#newUsername').value.trim();
  const password = document.querySelector('#password1').value.trim();
  const vfyPassword = document.querySelector('#password2').value.trim();

  if (password !== vfyPassword) {
    console.log('Passwords Must Match!')
    return
  }
  if (username && password && vfyPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signupSubmit = document.getElementById('signupSubmit')
signupSubmit.addEventListener('click', signupFormHandler);
