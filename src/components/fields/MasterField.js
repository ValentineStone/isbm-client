import React from 'react'
import MasterField from '../base-fields/MasterField'
import contextify from '../base-fields/contextify'

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
})(MasterField)