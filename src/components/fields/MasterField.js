import React from 'react'
import MasterField from '~/react-base-fields/MasterField'
import contextify from '~/react-base-fields/contextify'

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
})(MasterField)