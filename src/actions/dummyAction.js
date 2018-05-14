import { createAction } from 'redux-actions'
import { DUMMY_ACTION } from './types'
const dummyAction = createAction(DUMMY_ACTION)
export default dummyAction