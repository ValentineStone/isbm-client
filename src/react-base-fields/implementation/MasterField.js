import React from 'react'
import MasterField from '../MasterField'
import contextify from '../contextify'

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
})(MasterField)