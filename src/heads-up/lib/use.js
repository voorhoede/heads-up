/**
 * Extend schema validation with custom functions
 */
function hasLetterA(value) {
  return value.includes('a')
}

function hasLength5(value) {
  return value.length === 5
}

export default {
  hasLetterA,
  hasLength5
}
