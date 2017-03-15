import test from 'ava'
import {take, put, call, race} from 'redux-saga/effects'
import * as constants from '../app/actions/constants'
import * as actions from '../app/actions'
import {logoutFlow, registerFlow, loginFlow, authorize, logout} from '../app/sagas'

let user = {username: 'juan', password: 'password'}
let data = {data: user}
let blankForm = {username: '', password: ''}
let raceObject = {
  auth: call(authorize, {...user, isRegistering: false}),
  logout: take(constants.LOGOUT)
}

test('loginFlow saga with success', t => {
  let gen = loginFlow()
  let loginRace = race(raceObject)
  let authWinner = {auth: true}

  t.deepEqual(
    gen.next().value,
    take(constants.LOGIN_REQUEST)
  )

  t.deepEqual(
    gen.next(data).value,
    loginRace
  )

  t.deepEqual(
    gen.next(authWinner).value,
    put(actions.setAuthState(true))
  )

  t.deepEqual(
    gen.next().value,
    put(actions.changeForm(blankForm))
  )
})

test('logoutFlow saga', t => {
  let gen = logoutFlow()

  t.deepEqual(
    gen.next().value,
    take(constants.LOGOUT)
  )

  t.deepEqual(
    gen.next().value,
    put(actions.setAuthState(false))
  )

  t.deepEqual(
    gen.next().value,
    call(logout)
  )
})

test('registerFlow saga with success', t => {
  let gen = registerFlow()

  t.deepEqual(
    gen.next().value,
    take(constants.REGISTER_REQUEST)
  )

  t.deepEqual(
    gen.next(data).value,
    call(authorize, {...user, isRegistering: true})
  )

  t.deepEqual(
    gen.next(true).value,
    put(actions.setAuthState(true))
  )

  t.deepEqual(
    gen.next(true).value,
    put(actions.changeForm(blankForm))
  )
})
