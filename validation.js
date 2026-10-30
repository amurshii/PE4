// Об'єкт зі всіма правилами валідації
const validationRules = {
  firstName: {
    letters: "^[A-Za-zА-Яа-яҐґЄєІіЇї]+$",
    capital: "^[A-ZА-ЯҐЄІЇ]",
    errorMessages: {
      required: "First name is required",
      letters: "Only English or Ukrainian letters are allowed",
      capital: "Name must start with a capital letter"
    }
  },
  lastName: {
    letters: "^[A-Za-zА-Яа-яҐґЄєІіЇї]+$",
    capital: "^[A-ZА-ЯҐЄІЇ]",
    errorMessages: {
      required: "Surname is required",
      letters: "Only English or Ukrainian letters are allowed",
      capital: "Surname must start with a capital letter"
    }
  },
  email: {
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    errorMessages: {
      required: "Email is required",
      pattern: "Invalid email address"
    }
  },
  password: {
    minLength: 8,
    uppercase: "(?=.*[A-Z])",
    lowercase: "(?=.*[a-z])",
    number: "(?=.*\\d)",
    specialCharacter: "(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])",
    noSpace: "^\\S+$",
    errorMessages: {
      required: "Password is required",
      minLength: "Password must be at least 8 characters long",
      uppercase: "Password must contain at least one uppercase letter",
      lowercase: "Password must contain at least one lowercase letter",
      number: "Password must contain at least one number",
      specialCharacter: "Password must contain at least one special character",
      noSpace: "Password cannot contain spaces"
    }
  }
};
