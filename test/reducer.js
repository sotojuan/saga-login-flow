import test from 'ava'
import {reducerTest} from 'redux-ava'
import {
  changeForm,
  setAuthState,
  sendingRequest,
  requestError,
  clearError
} from '../app/actions'
import app from '../app/reducers'

const stateBefore = {
  formState: {
    username: '',
    password: ''
  },
  error: 'Wrong password',
  currentlySending: false,
  loggedIn: false
}

test('reducer handles CHANGE_FORM action', reducerTest(
  app,
  stateBefore,
  changeForm({username: 'juan', password: 'password'}),
  {...stateBefore, formState: {username: 'juan', password: 'password'}}
))

test('reducer handles SET_AUTH action', reducerTest(
  app,
  stateBefore,
  setAuthState(true),
  {...stateBefore, loggedIn: true}
))

test('reducer handles SENDING_REQUEST action', reducerTest(
  app,
  stateBefore,
  sendingRequest(true),
  {...stateBefore, currentlySending: true}
))

test('reducer handles REQUEST_ERROR action', reducerTest(
  app,
  stateBefore,
  requestError('Username already in use'),
  {...stateBefore, error: 'Username already in use'}
))

test('reducer handles CLEAR_ERROR action', reducerTest(
  app,
  stateBefore,
  clearError(),
  {...stateBefore, error: ''}
))
