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

function hasValue(value) {
  return value
}

function hasValidViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',')
  const viewportContentCheck = {
    width: /(^[1-9][0-9]*$)|(^device-width$)/,
    height: /(^[1-9][0-9]*$)|(^device-height$)/,
    'initial-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'maximum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'minimum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
    'user-scalable': /(yes|no)/,
    'viewport-fit': /(auto|contain|cover)/
  }
  return arrayOfValues.every(entry => {
    const entryKey = entry.split('=')[0]
    const entryValue = entry.split('=')[1]
    return entryKey in viewportContentCheck && viewportContentCheck[entryKey].test(entryValue)
  })
}

function usesZoomBlockingViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',')
  const zoomBlockingContentCheck = [
    'maximum-scale',
    'minimum-scale',
    'user-scalable',
  ]
  let isNotBlockingZoom = true

  arrayOfValues.map(entry => {
    const entryKey = entry.split('=')[0]

    if (zoomBlockingContentCheck.includes(entryKey)) {
      isNotBlockingZoom = false
    }
  })
  return isNotBlockingZoom
}

export default {
  hasLetterA,
  hasLength5,
  hasCorrectFormattedCharset,
  isDefinedInCharsetAttribute,
  hasValidLangValue,
  hasValue,
  hasValidViewportContent,
  usesZoomBlockingViewportContent,
}
