import server from '/server.js'
import I18n from '/i18n.js'

export default <>
  <number name="workWidth" label="Work width" suffix="cm" transform={v => v / 100} />
  <number name="workHeight" label="Work Height" suffix="cm" transform={v => v / 100} />
  <number name="frameWidth" label="Frame width" suffix="cm" transform={v => v / 100} />
  <number name="framePrice" label="Frame price" suffix={['{rub}/{m}']} />
  <boolean name="embroideryStretching" label="Embroidery stretching" default={false} />
  <number name="cardboardCount" label="Cardboard count" default={1} />
  <number name="passepartoutWidth" label="Passepartout width" suffix="cm" transform={v => +v / 100} />
  <number name="passepartoutCount" label="Passepartout count" default={0} />
  <select name="glass" label="Glass" default="regular" options={{
    regular: 'Regular glass',
    antiReflective: 'Anti-reflective glass',
    museum: 'Museum glass'
  }} />
  <input
    name="price"
    value={value => server.jrpc('calc', value)}
    transform={value =>
      typeof value === 'number'
        ? value.toFixed(2)
        : I18n.t('Fill out the form')
    }
    label="Price"
    suffix="rub"
  />
</>