const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  //Convertiendo campos vacíos a cadenas vacías
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Check field name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Campo de nombre requerido";
  }
  //Check field email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Campo email requerido";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido";
  }
  //Check fields password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Campo password requerido";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Campo de confirmación de password requerido";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password debe contener 6 carácteres mínimo";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password no coincide";
  }
  //
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
