import validateCountryCodes from "../lib/country-codes";
/**
 * Extend schema validation with custom functions
 */
function hasLetterA(value) {
  return value.includes('a')
}

function hasLength5(value) {
  return value.length === 5
}

function hasCorrectFormattedCharset(value) {
  return value.toLowerCase() === 'utf-8'
}

function isDefinedInCharsetAttribute(value, attrs) {
  return attrs['charset'] === value
}

function hasValidLangValue(value) {
  return validateCountryCodes().includes(value)
}

export default {
  hasLetterA,
  hasLength5,
  hasCorrectFormattedCharset,
  hasValidLangValue,
  isDefinedInCharsetAttribute,
}
