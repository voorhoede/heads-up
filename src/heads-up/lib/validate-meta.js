export function validateCharset(string) {
    const value = string === 'utf-8' ? string : null
    let hint = value === null 
    ? "The character encoding should be specified for every HTML page, either by using the charset parameter on the <code>Content-Type</code> HTTP response header (e.g.: <code>Content-Type: text/html; charset=utf-8</code>) and/or using the charset meta tag in the file." 
    : null
    if(string === 'utf8') hint = "<code>utf-8</code> prefered over <code>utf8</code>"
    
    return { value, hint }
  }