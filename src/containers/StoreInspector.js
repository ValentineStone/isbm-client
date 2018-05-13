import Inspector from '~/components/Inspector'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { data: state }
}

export default connect(mapStateToProps)(Inspector)