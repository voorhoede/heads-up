import validateCountryCodes from "../lib/country-codes";
import validateCharsetCodes from "../lib/charset-codes";
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

function hasValidCharsetValue(value) {
  return validateCharsetCodes().includes(value)
}

function hasValidViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',')
  const viewportContentCheck = {
    width: /(^[1-9][0-9]*$)|(device-width)/,
    height: /(^[1-9][0-9]*$)|(device-height)/,
    'initial-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'maximum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'minimum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'user-scalable': /(yes|no)/,
    'viewport-fit': /(auto|contain|cover)/
  }
  let isValid = true

  arrayOfValues.map(entry => {
    const entryKey = entry.split('=')[0]
    const entryValue = entry.split('=')[1]

    if (entryKey in viewportContentCheck && isValid) {
      if (!viewportContentCheck[entryKey].test(entryValue)) {
        isValid = false
      }
    }
    else{
      isValid = false
    }
  })
  return isValid
}

function hasValidColor(value) {
  const style = new Option().style;
  style.color = value;
  return style.color.length > 0
}

export default {
  hasLetterA,
  hasLength5,
  hasCorrectFormattedCharset,
  hasValidLangValue,
  isDefinedInCharsetAttribute,
  hasValidCharsetValue,
  hasValidViewportContent,
  hasValidColor
}
