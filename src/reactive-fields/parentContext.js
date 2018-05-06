import React, { createContext } from 'react'

const ParentContext = React.createContext(null)

const withInferredParentContext = Component => {
  const HOC = props => {//React.forwardRef((props, ref) => {
    if (props.parent === undefined)
      return (
        <ParentContext.Consumer>
          {parent => <Component {...props} parent={parent} />}
        </ParentContext.Consumer>
      )
    else
      return <Component {...props} />
  }//)
  const displayName = Component.displayName || Component.name || 'Component'
  HOC.displayName = `WithInferredParentContext(${displayName})`
  return HOC
}
const asParentContextProvider = Component => {
  const displayName = Component.displayName || Component.name || 'Component'
  const extentionDisplayName = `AsParentContextProvider(${displayName})`
  class AsParentContextProviderExtendingClass extends Component {
    render() {
      return (
        <ParentContext.Provider value={this}>
          {super.render()}
        </ParentContext.Provider>
      )
    }
  }
  AsParentContextProviderExtendingClass.displayName = extentionDisplayName
  return AsParentContextProviderExtendingClass
}
const contextify = (Component, { provider = false, consumer = false } = {}) => {
  if (provider)
    Component = asParentContextProvider(Component)
  if (consumer)
    Component = withInferredParentContext(Component)
  return Component
}

ParentContext.withInferredParentContext = () => withInferredParentContext
ParentContext.asParentContextProvider = () => asParentContextProvider
ParentContext.contextify =
  options => Component => contextify(Component, options)

export default ParentContext