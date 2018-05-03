import server from '/server.js'

export default {
  workWidth: <number label="Work width" units="cm" scale={1 / 100} />,
  workHeight: <number label="Work Height" units="cm" scale={1 / 100} />,
  frameWidth: <number label="Frame width" units="cm" scale={1 / 100} />,
  framePrice: <number label="Frame price" units={['{rub}/{m}']} />,
  embroideryStretching: <boolean label="Embroidery stretching" default={false} />,
  cardboardCount: <number label="Cardboard count" default={1} />,
  passepartoutWidth: <number label="Passepartout width" units="cm" scale={1 / 100} />,
  passepartoutCount: <number label="Passepartout count" default={0} />,
  glass: <select single label="Glass" default="regular" options={{
    regular: 'Regular glass',
    antiReflective: 'Anti-reflective glass',
    museum: 'Museum glass'
  }} />,
  price: <number equals={options => server.jrpc('calc', options)} label="Price" units="rub" />
}