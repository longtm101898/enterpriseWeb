export const validate = (element, formdata = []) => {
  let error = [true, ""];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.password){
    let valid = true;
    if(element.value.length < 4 || element.value.length > 25){
      valid = false;
    }
    const message = `${!valid ? "Passwords must be from 5 to 25 chars" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? "Passwords do not match" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.specialcharacter){
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const valid = !format.test(element.value)
    const message = `${!valid ? "Please do not enter special char" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };
  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};
  for (let key in formData) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formData[key].value;
    }
  }
  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let formIsValid = true;
  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }
  return formIsValid;
};

export const populateOptionFields = (formData, arrayData = [], field) => {
  const newArr = [];
  const newFormdata = { ...formData };
  arrayData.forEach(item => {
    newArr.push({ key: item.id, value: item.name });
  });
  newFormdata[field].config.options = newArr;
  return newFormdata;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };
  for (let key in formData) {
    if (key === "images") {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = "";
    }
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = "";
  }
  return newFormData;
};

export const populateFields = (formData, fields) => {
  const newFormData = { ...formData };
  for (let key in newFormData) {
    newFormData[key].value = fields[key];
    newFormData[key].valid = true;
    newFormData[key].touched = true;
    newFormData[key].validationMessage = "";
  }
  return newFormData;
};
