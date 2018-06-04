import React from 'react'

let uniqueKeyCounter = 0

class Keyed extends React.Component {
  constructor(props) {
    super(props)
    this.key = uniqueKeyCounter++
  }
  render() {
    if (props.unique !== this.prevUnique) {
      this.key = uniqueKeyCounter++
      this.prevUnique = props.unique
    }
    return (
      <React.Fragment key={this.key}>
        {this.props.children}
      </React.Fragment>
    )
  }
}