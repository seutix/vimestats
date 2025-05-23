function checkAuth() {
  // Пример: читаем username из localStorage
  const username = localStorage.getItem('username');
  return username ? { isAuthorized: true, username } : { isAuthorized: false };
}

function updateAuthUI() {
  const authKeyBtn = document.getElementById('auth-key-btn');
  if (!authKeyBtn) return;

  const authStatus = checkAuth();

  if (authStatus.isAuthorized) {
    authKeyBtn.innerHTML = ''; // очищаем содержимое

    const img = document.createElement('img');
    img.src = `https://skin.vimeworld.com/head/${authStatus.username}.png`;
    img.alt = authStatus.username;
    img.style.width = '25px';
    img.style.height = '25px';
    img.style.borderRadius = '3px';
    img.style.display = 'block';

    authKeyBtn.appendChild(img);
  } else {
    authKeyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.5C16 8.53757 13.5376 11 10.5 11H7V13H5V15L4 16H0V12L5.16351 6.83649C5.0567 6.40863 5 5.96094 5 5.5C5 2.46243 7.46243 0 10.5 0C13.5376 0 16 2.46243 16 5.5ZM13 4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z" fill="white"/>
      </svg>
    `;
  }
}

window.addEventListener('DOMContentLoaded', updateAuthUI);
