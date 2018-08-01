import React from 'react'

export default function jsonToJSX(json, spacer = 2) {
  if (typeof spacer === 'number')
    spacer = ' '.repeat(spacer)
  const jsonToJSX = (json, indent = '') => {
    const indented = indent + spacer
    switch (typeof json) {
      case 'boolean':
        return <span className="boolean">{String(json)}</span>
      case 'string':
        return <span className="string">'{json}'</span>
      case 'number':
        return <span className="number">{json}</span>
      case 'undefined':
        return <span className="undefined">undefined</span>
      case 'object':
        if (json === null)
          return <span className="null">null</span>
        else if (Array.isArray(json))
          return (
            <span className="array">
              {'[\n'}
              {json.map((value, index) => (
                <React.Fragment key={index}>
                  {indented}
                  <span className="value">{jsonToJSX(value, indented)}</span>
                  {index + 1 < json.length ? ',' : ''}
                  {'\n'}
                </React.Fragment>
              ))}
              {indent}{']'}
            </span>
          )
        else
          return (
            <span className="object">
              {'{\n'}
              {Object.entries(json).map(([key, value], index, { length }) => (
                <React.Fragment key={key}>
                  {indented}
                  <span className="key">{key}</span>
                  {': '}
                  <span className="value">{jsonToJSX(value, indented)}</span>
                  {index + 1 < length ? ',' : ''}
                  {'\n'}
                </React.Fragment>
              ))}
              {indent}{'}'}
            </span>
          )
    }
  }
  return <span className="root">{jsonToJSX(json)}</span>
}