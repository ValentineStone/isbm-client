import React from 'react'
import MasterField from '../MasterField.js'
import contextify from '../contextify.js'

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
})(MasterField)