export function formatDateTime (datetimeStr) {
  let datetime = new Date(datetimeStr)
  return datetime.toLocaleDateString() + ' ' +
    datetime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
}

export function sanitizeBlank (inputStr) {
  return /^\s*$/.test(inputStr) ? '' : inputStr
}

export function capitalizeStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
