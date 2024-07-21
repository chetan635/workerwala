/**
 * Method to Evaluate how strong is the password based on some basic rules.
 *
 * @param {*password} password which is provided by user
 * @returns if password is weak, medium or strong.
 */
export default function evaluatePasswordStrength(password) {
  if (!password) return "";

  let score = 0;
  let lengthCriteria = /.{12,}/; // Increased length requirement
  let upperCaseCriteria = /[A-Z]/;
  let lowerCaseCriteria = /[a-z]/;
  let numberCriteria = /[0-9]/;
  let specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/;

  // Length criteria
  if (lengthCriteria.test(password)) {
    score += 2;
  } else if (/.{8,11}/.test(password)) {
    score += 1;
  }

  // Upper case criteria
  if (upperCaseCriteria.test(password)) {
    score += 1;
  }

  // Lower case criteria
  if (lowerCaseCriteria.test(password)) {
    score += 1;
  }

  // Number criteria
  if (numberCriteria.test(password)) {
    score += 1;
  }

  // Special character criteria
  if (specialCharCriteria.test(password)) {
    score += 1;
  }

  // Check for sequences and repeated characters
  let sequences = /(\d{3,}|[a-z]{3,}|[A-Z]{3,})/;
  let repeats = /(\w)\1{2,}/;

  if (sequences.test(password)) {
    score -= 1;
  }

  if (repeats.test(password)) {
    score -= 1;
  }

  // Check for common passwords (can be extended with a larger list)
  let commonPasswords = [
    "password",
    "123456",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "1234567890",
    "qwerty",
    "abc123",
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    return "Very_Weak";
  }

  // Return the score
  if (score >= 6) {
    return "Very_Strong";
  } else if (score >= 4) {
    return "Strong";
  } else if (score >= 2) {
    return "Medium";
  } else {
    return "Weak";
  }
}
