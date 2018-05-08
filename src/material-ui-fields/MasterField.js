import React from 'react'
import MasterField from '/react-base-fields/MasterField.js'
import contextify from '/react-base-fields/contextify.js'

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
})(MasterField)