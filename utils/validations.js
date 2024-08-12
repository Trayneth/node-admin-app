let required = (propertyType) => {
  return (v) => (v && !!v) || `This field is required.`;
};

// let requiredWithLang = (value) => {
//   return (value && !!value) || `Field (Khmer) is required.`;
// };
const requiredWithLang = (value, propertyType = 'Field') => {
  return (value && !!value) || `${propertyType} in (Khmer) is required.`;
};

let notBlank = (propertyType) => {
  return (v) => (v && !!v.trim()) || `This field can not be blank.`;
};

let requiredSelect = (propertyType) => {
  return (v) => (v && v.length > 0) || `This field is required.`;
};

let minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) || `This field must be less than ${minLength}`;
};

let maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `This field must be at most ${maxLength} characters long.`;
};

let numberRule = (minValue, maxValue) => {
  return (v) =>
    (!isNaN(parseFloat(v)) && v >= minValue && v <= maxValue) ||
    `Number has to be between ${minValue} and ${maxValue}`;
};

let imageRule = (propertyType) => {
  return (v) =>
    !v || v.size < 2e6 || `This field size should be less than 2 MB!`;
};

export default {
  required,
  requiredSelect,
  requiredWithLang,
  minLength,
  maxLength,
  numberRule,
  notBlank,
  imageRule,
};
