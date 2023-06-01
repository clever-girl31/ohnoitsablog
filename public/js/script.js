let loggedIn = false
// script for navbar on main.handlebars

// home button
const homeBtn = document.getElementById('homeBtn')
homeBtn.addEventListener('click', function() {
  window.location.href = '/'
})

// dashboard button
const dashboardBtn = document.getElementById('dashboardBtn')
dashboardBtn.addEventListener('click', function () {
  if (!loggedIn) {
    window.location.href = 'login'
  } else {
    window.location.href = 'dashboard'
  }
})

// login button
const logInBtn = document.getElementById('logInBtn')
logInBtn.addEventListener('click', function () {
  window.location.href = 'login'
})

  

console.log('hello world')