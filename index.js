const validationPage = new ValidationPage();

const form = document.querySelector('#form');
const name = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const checkbox = document.querySelector('#checkbox');
const submitBtn = document.querySelector('#submit');

const nameError = document.getElementById('name-error');
const surnameError = document.getElementById('surname-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Стан кожного поля (валідне чи ні)
const fieldState = { firstName: false, lastName: false, email: false, password: false };

// Додає клас valid / invalid і показує повідомлення про помилку
function validOrInvalid(input, isValid, errorElement, message) {
  input.classList.remove('valid', 'invalid');
  input.classList.add(isValid ? 'valid' : 'invalid');
  errorElement.textContent = isValid ? '' : message;
}

// Кнопка активна тільки коли всі поля валідні
function updateSubmitState() {
  submitBtn.disabled = !Object.values(fieldState).every(Boolean);
}

function checkField(input, errorElement, key, validate) {
  validate();
  const errs = validationPage.errors[key];
  fieldState[key] = !errs;
  validOrInvalid(input, !errs, errorElement, errs ? errs[0] : '');
  updateSubmitState();
}

// Жива валідація (подія input)
name.addEventListener('input', () =>
  checkField(name, nameError, 'firstName', () => validationPage.validateName(name.value, 'firstName')));

surname.addEventListener('input', () =>
  checkField(surname, surnameError, 'lastName', () => validationPage.validateName(surname.value, 'lastName')));

email.addEventListener('input', () =>
  checkField(email, emailError, 'email', () => validationPage.validateEmail(email.value)));

password.addEventListener('input', () =>
  checkField(password, passwordError, 'password', () => validationPage.validatePassword(password.value)));

// Показати / приховати пароль
checkbox.addEventListener('change', () => {
  password.type = checkbox.checked ? 'text' : 'password';
});

// Відправка форми – тільки якщо всі поля валідні
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    firstName: name.value,
    lastName: surname.value,
    email: email.value,
    password: password.value
  };
  const errors = validationPage.validateForm(data);

  if (Object.keys(errors).length > 0) {
    // Є помилки – показуємо біля відповідних полів
    const map = {
      firstName: [name, nameError], lastName: [surname, surnameError],
      email: [email, emailError], password: [password, passwordError]
    };
    for (const key in map) {
      const [input, el] = map[key];
      validOrInvalid(input, !errors[key], el, errors[key] ? errors[key][0] : '');
    }
    return;
  }

  console.log('Form data:', data);
  alert(`Registration successful!\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}`);
});

updateSubmitState();
