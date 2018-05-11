import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import 'whatwg-fetch'

import app from '~/app'