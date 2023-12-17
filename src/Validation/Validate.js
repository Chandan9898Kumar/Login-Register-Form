//                                                                Password Validation
export function PasswordValidate(values) {
  let errors = {};
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  } else if (!/\d/.test(values.password)) {
    errors.password = 'Password must contain atleast 1 number';
  } else if (!/[!@#$%&?]/g.test(values.password)) {
    errors.password = 'Password must contain atleast 1 special character';
  } else if (!/[A-Z]/g.test(values.password)) {
    errors.password = 'Password must contain atleast 1 capitol letter';
  }

  return errors;
}

//                                                                  Email Validation
export function emailValidate(email) {
  // Check if email is empty
  if (email.trim() === '') {
    return 'Please enter an email address';
  }

  // Check if email is valid
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return "Please enter a valid email address - missing or too many '@' symbols";
  }

  const localPart = emailParts[0];
  const domainPart = emailParts[1];

  // Check local part for invalid characters
  const localPartRegex =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*$/;
  if (!localPartRegex.test(localPart)) {
    return 'Please enter a valid email address - invalid characters in local part';
  }

  // Check local part for consecutive periods
  if (localPart.includes('..')) {
    return 'Please enter a valid email address - consecutive periods in local part';
  }

  // Check local part for leading or trailing period
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return 'Please enter a valid email address - leading or trailing period in local part';
  }

  // Check domain part for invalid characters
  const domainPartRegex = /^[a-zA-Z0-9.-]+$/;
  if (!domainPartRegex.test(domainPart)) {
    return 'Please enter a valid email address - invalid characters in domain part';
  }

  // Check domain part for consecutive hyphens
  if (domainPart.includes('--')) {
    return 'Please enter a valid email address - consecutive hyphens in domain part';
  }

  // Check domain part for leading or trailing hyphen
  if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
    return 'Please enter a valid email address - leading or trailing hyphen in domain part';
  }

  // Check domain part for valid TLD
  const tldRegex = /^[a-zA-Z]{2,}$/;
  const domainParts = domainPart.split('.');
  if (
    domainParts.length < 2 ||
    !tldRegex.test(domainParts[domainParts.length - 1])
  ) {
    return 'Please enter a valid email address - invalid top-level domain';
  }

  return '';
}
