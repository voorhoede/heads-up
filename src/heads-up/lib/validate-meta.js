import { langCodes, regionCodes } from './isoCodes';

export function validateCharset(string) {
    const value = string === 'utf-8' ? string : null
    let hint = value === null 
    ? "The character encoding should be specified for every HTML page, either by using the charset parameter on the <code>Content-Type</code> HTTP response header (e.g.: <code>Content-Type: text/html; charset=utf-8</code>) and/or using the charset meta tag in the file." 
    : null
    if(string === 'utf8') hint = "<code>utf-8</code> prefered over <code>utf8</code>"
    
    return { value, hint }
}

export function validateLang(string) {
    /**
     * test if string starts/ends with dash or has multiple dashes or anything beside a-z|-
     */
    if( /^-|(.*[-]){2,}.*|-$/.test(string) || /[^a-zA-Z-]/.test(string)) return false
    
    const lang = string.split('-')[0]
    const region = string.split('-')[1] ? string.split('-')[1] : null

    if(!lang || lang.length !== 2 || (region && region.length !== 2) ) return false
    if(!langCodes.includes(lang)) return false
    if(region && !regionCodes.includes(region) ) return false

    return string
}