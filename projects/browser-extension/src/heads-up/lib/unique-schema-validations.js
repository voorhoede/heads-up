import validateCountryCodes from './country-codes';

const viewportContentCheck = {
  width: /(^[1-9][0-9]*$)|(^device-width$)/,
  height: /(^[1-9][0-9]*$)|(^device-height$)/,
  'initial-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'maximum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'minimum-scale': /^(?:9(?:\.0)?|[1-9](?:\.[0-9])?|0?\.[1-9])$/,
  'user-scalable': /(yes|no)/,
  'viewport-fit': /(auto|contain|cover)/,
};

function hasLetterA(value) {
  return value.includes('a');
}

function hasLength5(value) {
  return value.length === 5;
}

function hasCorrectFormattedCharset(value) {
  if (value) {
    return value.toLowerCase() === 'utf-8';
  }
}

function isDefinedInCharsetAttribute(value, attrs) {
  if (value) {
    return attrs['charset'] === value;
  }
}

function hasValidLangValue(value) {
  return validateCountryCodes().includes(value);
}

function hasValue(value) {
  return value;
}

function hasValidViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',');
  
  return arrayOfValues.every(entry => {
    const [ entryKey, entryValue ] = entry.split('=');
    return entryKey in viewportContentCheck && viewportContentCheck[entryKey].test(entryValue);
  });
}

function hasValidViewportKeys(value) {
  const arrayOfValues = value.replace(' ', '').split(',');
  const validViewportKeys = Object.keys(viewportContentCheck);

  return arrayOfValues.every(entry => {
    const entryKey = entry.split('=')[0];

    return validViewportKeys.includes(entryKey);
  });
}

function usesZoomBlockingViewportContent(value) {
  const arrayOfValues = value.replace(' ', '').split(',');
  const zoomBlockingContentCheck = [
    'maximum-scale',
    'minimum-scale',
    'user-scalable',
  ];

  return !arrayOfValues.some(entry => {
    const entryKey = entry.split('=')[0];

    return zoomBlockingContentCheck.includes(entryKey);
  });
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
  hasValidViewportKeys,
};
