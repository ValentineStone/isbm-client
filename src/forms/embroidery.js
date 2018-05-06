import Form from '/components/Form.js'
import server from '/server.js'
import I18n from '/i18n.js'

export default class EmbroideryForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.form = new Form()
  }
  render() {
    const Form = this.form
    return (
      <Form.Object>
        <Form.Number
          name="workWidth"
          label={t`Work width`}
          suffix={t`cm`}
          transform={v => v / 100}
        />
        <Form.Number
          name="workHeight"
          label={t`Work Height`}
          suffix={t`cm`}
          transform={v => v / 100}
        />
        <Form.Number
          name="frameWidth"
          label={t`Frame width`}
          suffix={t`cm`}
          transform={v => v / 100}
        />
        <Form.Number
          name="framePrice"
          label={t`Frame price`}
          suffix={t('{rub}/{m}')}
        />
        <Form.Boolean
          name="embroideryStretching"
          label={t`Embroidery stretching`}
          default={false}
        />
        <Form.Number
          name="cardboardCount"
          label={t`Cardboard count`}
          default={1}
        />
        <Form.Number
          name="passepartoutWidth"
          label={t`Passepartout width`}
          suffix={t`cm`}
          transform={v => +v / 100}
        />
        <Form.Number
          name="passepartoutCount"
          label={t`Passepartout count`}
          default={0}
        />
        <Form.Select
          name="glass"
          label={t`Glass`}
          default="regular"
          options={{
            regular: t`Regular glass`,
            antiReflective: t`Anti-reflective glass`,
            museum: t`Museum glass`
          }}
        />
        <Form.Number
          name="price"
          value={formValue => server.jrpc('calc', formValue)}
          transform={value =>
            typeof value === 'number'
              ? value.toFixed(2)
              : t`Fill out the form`
          }
          label={t`Price`}
          suffix={t`rub`}
        />
      </Form.Object>
    )
  }
}