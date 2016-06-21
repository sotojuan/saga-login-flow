# Saga Login Flow

> A login/register flow built with React & Redux Saga

[![Build Status](https://travis-ci.org/sotojuan/saga-login-flow.svg?branch=master)](https://travis-ci.org/sotojuan/saga-login-flow)

This application demonstrates what a React-based register/login workflow might look like with [Redux Saga](https://github.com/yelouafi/redux-saga).

It's based on Max Stoiber's [login-flow](https://github.com/mxstbr/login-flow), but uses Redux Saga instead of Redux Thunk to handle asynchronous actions.

All the saga stuff is [here](https://github.com/sotojuan/saga-login-flow/blob/master/app/sagas/index.js). The rest is regular React and Redux!

## Authentication

Authentication happens in `app/auth/index.js`, using `fakeRequest.js` and `fakeServer.js`. `fakeRequest` is a fake `XMLHttpRequest` wrapper. `fakeServer` responds to the fake HTTP requests and pretends to be a real server, storing the current users in local storage with the passwords encrypted using `bcrypt`.

## Thanks

* [Max Stoiber](https://twitter.com/mxstbr) for the Login Flow idea.
* [Yassine Elouafi](https://github.com/yelouafi) for Redux Saga. Awesome!

## License

MIT © [Juan Soto](http://juansoto.me)
