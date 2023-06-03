document.addEventListener('DOMContentLoaded', () => {
  const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
    console.log('click');
  };

  console.log('logout script is linked');
  const logOutBtn = document.getElementById('logOutBtn');
  logOutBtn.addEventListener('click', logout);
});