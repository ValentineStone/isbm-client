import React from 'react'

export const ParentContext = React.createContext(null)
ParentContext.Consumer.displayName = 'ParentContext.Consumer'
ParentContext.Provider.displayName = 'ParentContext.Provider'
export const NameContext = React.createContext(undefined)
NameContext.Consumer.displayName = 'NameContext.Consumer'
NameContext.Provider.displayName = 'NameContext.Provider'

const displayNameOf =
  Component => Component.displayName || Component.name || 'Component'

export const withNameConsumer = () => Component => {
  let HOC = (props, ref) => {
    if (props.name === undefined)
      return (
        <NameContext.Consumer>
          {name => <Component {...props} name={name} ref={ref} />}
        </NameContext.Consumer>
      )
    else
      return <Component {...props} ref={ref} />
  }
  HOC.displayName = `WithNameConsumer(${displayNameOf(Component)})`
  
  const refHOC = React.forwardRef(HOC)
  refHOC.displayName = HOC.displayName
  return refHOC
}

export const withParentConsumer = () => Component => {
  const HOC = (props, ref) => {
    if (props.parent === undefined)
      return (
        <ParentContext.Consumer>
          {parent => <Component {...props} parent={parent} ref={ref} />}
        </ParentContext.Consumer>
      )
    else
      return <Component {...props} ref={ref} />
  }
  HOC.displayName = `WithParentConsumer(${displayNameOf(Component)})`
  
  const refHOC = React.forwardRef(HOC)
  refHOC.displayName = HOC.displayName
  return refHOC
}

export const asNameProvider = name => Component => {
  class AsNameProvider extends Component {
    render() {
      return (
        <NameContext.Provider value={name}>
          {super.render()}
        </NameContext.Provider>
      )
    }
  }
  AsNameProvider.displayName = `AsNameProvider(${displayNameOf(Component)})`
  return AsNameProvider
}

export const asParentProvider = () => Component => {
  class AsParentProvider extends Component {
    render() {
      return (
        <ParentContext.Provider value={this}>
          {super.render()}
        </ParentContext.Provider>
      )
    }
  }
  AsParentProvider.displayName = `AsParentProvider(${displayNameOf(Component)})`
  return AsParentProvider
}

export const asNamePerChildProvider = () => Component => {
  class AsNamePerChildProvider extends Component {
    renderChild() {
      const name = arguments[0]
      return (
        <NameContext.Provider value={name} key={name}>
          {super.renderChild.apply(this, arguments)}
        </NameContext.Provider>
      )
    }
  }
  AsNamePerChildProvider.displayName =
    `AsNamePerChildProvider(${displayNameOf(Component)})`
  return AsNamePerChildProvider
}

export const asParentAndNamePerChildProvider = () => Component => {
  class AsParentAndNamePerChildProvider extends Component {
    render() {
      return (
        <ParentContext.Provider value={this}>
          {super.render()}
        </ParentContext.Provider>
      )
    }
    renderChild() {
      const name = arguments[0]
      return (
        <NameContext.Provider value={name} key={name}>
          {super.renderChild.apply(this, arguments)}
        </NameContext.Provider>
      )
    }
  }
  AsParentAndNamePerChildProvider.displayName =
    `AsParentAndNamePerChildProvider(${displayNameOf(Component)})`
  return AsParentAndNamePerChildProvider
}

const contextify =
  (options) =>
    Component => {
      if (options.providesParent && options.providesNamePerChild)
        Component = asParentAndNamePerChildProvider()(Component)
      else if (options.providesParent)
        Component = asParentProvider()(Component)
      else if (options.providesNamePerChild)
        Component = asNamePerChildProvider()(Component)

      if (options.forcesNameOverride)
        Component = asNameProvider(undefined)(Component)

      if (options.consumesName)
        Component = withNameConsumer()(Component)
      if (options.consumesParent)
        Component = withParentConsumer()(Component)
      return Component
    }

export default contextify