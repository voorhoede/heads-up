import validateCountryCodes from "./country-codes";

function hasLetterA(value) {
  return value.includes('a')
}

function hasLength5(value) {
  return value.length === 5
}

function hasCorrectFormattedCharset(value) {
  if (value) {
    return value.toLowerCase() === 'utf-8'
  }
}

function isDefinedInCharsetAttribute(value, attrs) {
 if (value) {
   return attrs['charset'] === value
 }
}

function hasValidLangValue(value) {
  return validateCountryCodes().includes(value)
}

export default {
  hasLetterA,
  hasLength5,
  hasCorrectFormattedCharset,
  isDefinedInCharsetAttribute,
  hasValidLangValue
}
