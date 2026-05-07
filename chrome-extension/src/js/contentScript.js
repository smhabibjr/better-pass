import { getUsernameInput, getPasswordInput } from './utils/inputs'

const autoFillSignIn = ({username, password}) => {
  const usernameInput = getUsernameInput()
  const passwordInput = getPasswordInput()

  if (usernameInput) {
    usernameInput.value = username
  } else {
    console.warn('No username input found.')
  }

  if (passwordInput) {
    passwordInput.value = password
  } else {
    console.warn('No password input found.')
  }
}

chrome.runtime.onMessage.addListener(message => {
    autoFillSignIn(message)
})