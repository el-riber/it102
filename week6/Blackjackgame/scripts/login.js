

const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('startBtn');
const errorMsg = document.getElementById('errorMsg');
const loginForm = document.getElementById('loginForm');
const gameArea = document.getElementById('gameArea');
const welcome = document.getElementById('welcome');


const nameRegex = /^[\p{L}\s]+$/u;



function validateName(name) {
  const val = name.trim();
  if (val.length === 0) {
    return { ok: false, reason: 'O nome não pode ficar vazio.' };
  }
  if (val.length < 2) {
    return { ok: false, reason: 'Digite pelo menos 2 caracteres.' };
  }
  if (!nameRegex.test(val)) {
    return { ok: false, reason: 'Use apenas letras e espaços (sem números ou símbolos).' };
  }
  return { ok: true, value: val };
}


usernameInput.addEventListener('input', () => {
  const r = validateName(usernameInput.value);
  if (r.ok) {
    startBtn.disabled = false;
    errorMsg.textContent = '';
  } else {
    startBtn.disabled = true;
    errorMsg.textContent = r.reason;
  }
});


loginForm.addEventListener('submit', (ev) => {
  ev.preventDefault();             
  const r = validateName(usernameInput.value);
  if (!r.ok) {
    errorMsg.textContent = r.reason;
    usernameInput.focus();
    return;
  }
  const username = r.value;
  
  try { localStorage.setItem('blackjack_username', username); } catch(e){}

  
  loginForm.style.display = 'none';
  gameArea.style.display = 'block';
  welcome.textContent = `Bem-vindo(a), ${username}!`;
  
});
