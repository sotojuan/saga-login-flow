import {hashSync, genSaltSync, compareSync} from 'bcryptjs'
import genSalt from './salt'

let users
let localStorage
const salt = genSaltSync(10)

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

const server = {
  /**
  * Populates the users, similar to seeding a database in the real world
  */
  init () {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      // Set default user
      const juan = 'juan'
      const juanSalt = genSalt(juan)
      const juanPass = hashSync('password', juanSalt)

      users = {
        [juan]: hashSync(juanPass, salt)
      }

      localStorage.users = JSON.stringify(users)
      localStorage.encrypted = true
    } else {
      users = JSON.parse(localStorage.users)
    }
  },
 /**
 * Pretends to log a user in
 *
 * @param  {string} username The username of the user
 * @param  {string} password The password of the user
 */
  login (username, password) {
    const userExists = this.doesUserExist(username)

    return new Promise((resolve, reject) => {
      // If the user exists and the password fits log the user in and resolve
      if (userExists && compareSync(password, users[username])) {
        resolve({
          authenticated: true,
          // Fake a random token
          token: Math.random().toString(36).substring(7)
        })
      } else {
        // Set the appropiate error and reject
        let error

        if (userExists) {
          error = new Error('Wrong password')
        } else {
          error = new Error('User doesn\'t exist')
        }

        reject(error)
      }
    })
  },
 /**
 * Pretends to register a user
 *
 * @param  {string} username The username of the user
 * @param  {string} password The password of the user
 */
  register (username, password) {
    return new Promise((resolve, reject) => {
      // If the username isn't used, hash the password with bcrypt to store it in localStorage
      if (!this.doesUserExist(username)) {
        users[username] = hashSync(password, salt)
        localStorage.users = JSON.stringify(users)

        // Resolve when done
        resolve({registered: true})
      } else {
        // Reject with appropiate error
        reject(new Error('Username already in use'))
      }
    })
  },
 /**
 * Pretends to log a user out and resolves
 */
  logout () {
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve(true)
    })
  },
 /**
 * Checks if a username exists in the db
 * @param  {string} username The username that should be checked
 */
  doesUserExist (username) {
    return !(users[username] === undefined)
  }
}

server.init()

export default server
