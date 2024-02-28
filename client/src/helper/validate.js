import toast from "react-hot-toast";

export async function userNameValidate(values) {
  const errors = userNameVerify({}, values);
  return errors;
}

export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

export async function confirmPasswordValidate(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match!");
  }

  return errors;
}

export async function registerValidate(values) {
  const errors = userNameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function profileValidate(values) {
  const errors = emailVerify({}, values);
  firstNameVerify(errors, values);
  lastNameVerify(errors, values);
}

function lastNameVerify(error = {}, values) {
  if (!values.lastName) {
    error.lastName = toast.error("Last name is required...!");
  } else if (values.lastName.includes(" ")) {
    error.lastName = toast.error("Invalid last name");
  }

  return error;
}

function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error("First name is required...!");
  } else if (values.firstName.includes(" ")) {
    error.firstName = toast.error("Invalid First name");
  }

  return error;
}

function userNameVerify(error = {}, values) {
  if (!values.userName) {
    error.userName = toast.error("User name is required...!");
  } else if (values.userName.includes(" ")) {
    error.userName = toast.error("Invalid user name");
  }

  return error;
}

function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password is required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid password");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have a special character");
  }

  return error;
}

function emailVerify(error = {}, values) {
  const emailValidator = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.email) {
    error.email = toast.error("Email is required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong email");
  } else if (!emailValidator.test(values.email)) {
    error.email = toast.error("Invalid email address");
  }

  return error;
}
