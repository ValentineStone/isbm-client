import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import { createAction, handleActions, combineAction } from 'redux-actions'
import reduceReducers from 'reduce-reducers'
import { connect } from 'react-redux'