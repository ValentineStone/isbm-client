import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Inspector from '~/components/Inspector'
import BooleanField from '~/components/form/BooleanField'
import TextField from '~/components/form/TextField'
import SelectField from '~/components/form/SelectField'
import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'

export default class ClientEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchingFrame: false
    }
  }

  removeRecord = () => {
    this.props.jsonrpc('removeRecord', this.props.formApi.values)
    this.props.onChange(null)
  }
  handleFrameSearchFocus = () => this.setState({ searchingFrame: true })


  handlePlaceOrder = () => {
    const values = this.props.formApi.values
    this.props.jsonrpc('addRecord', 'Task', {
      summary: `Оформить работу "${values.name}"`
        + '\nБагет: ' + values.frameName + ` [${values.frameVendorCode}]`
        + '\nРазмеры: ' + values.workWidth + 'x' + values.workHeight
        + '\nПаспарту: ' + values.passepartoutWidth,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    this.props.formApi.setValue('placed', Date.now())
    this.props.formApi.setValue('summary',
      this.createSummary(values))
  }

  loadAdditionalFrames = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: 'Material'
  })

  handleFrameClick = frame => {
    this.props.formApi.setAllValues({
      frameName: frame.name,
      frameVendorCode: frame.vendorCode,
      frameWidth: frame.frameWidth,
      framePrice: frame.framePrice,
    })
    this.setState({ searchingFrame: false })
  }

  createSummary = order => {
    return `${order.frameName} [${order.frameVendorCode
      }] ${order.workWidth}x${order.workHeight}, (${order.passepartoutWidth})`
  }

  render() {
    const values = this.props.formApi.values
    const locked = Boolean(values.placed)

    return (
      <Translated keyed>
        {(t, i18n) =>
          <>
            <Typography color="textSecondary" gutterBottom align="center">
              {t`Order №` + ' ' + values.id}
            </Typography>
            {values.price && !values.placed &&
              <Button color="primary" fullWidth onClick={this.handlePlaceOrder}>
                {t`Place order`}
              </Button>
            }
            {values.placed &&
              <Typography color="textSecondary" gutterBottom align="center">
                {t`Placed on`}
                {' '}
                {new Date(values.placed)
                  .toLocaleString(i18n.lang)}
              </Typography>
            }
            <TextField
              multiline
              label={t`Name`}
              field="name"
              disabled={locked}
            />
            <TextField
              multiline
              label={t`Note`}
              field="note"
              disabled={locked}
            />
            <TextField
              disabled
              label={t`Price`}
              field="price"
              suffix={t`rub`}
            />
            <TextField
              label={t`Work width`}
              field="workWidth"
              suffix={t`m`}
              disabled={locked}
            />
            <TextField
              label={t`Work height`}
              field="workHeight"
              suffix={t`m`}
              disabled={locked}
            />
            <TextField
              label={t`Frame name`}
              field="frameName"
              onFocus={this.handleFrameSearchFocus}
              disabled={locked}
            />
            {this.state.searchingFrame &&
              <RecordList
                ListProps={{ style: { height: 200 } }}
                primaryKey="name"
                secondaryKey="vendorCode"
                //filter={this.state.filter}
                onRecordClick={this.handleFrameClick}
                //hiddenRecordsMessage={this.hiddenRecordsMessage}
                loadAdditionalRecords={this.loadAdditionalFrames}
              />
            }
            {values.frameName &&
              <>
                <TextField
                  label={t`Frame vendor code`}
                  field="frameVendorCode"
                  suffix={t`m`}
                  disabled
                />
                <TextField
                  label={t`Frame width`}
                  field="frameWidth"
                  suffix={t`m`}
                  disabled
                />
                <TextField
                  label={t`Frame price`}
                  field="framePrice"
                  suffix={t`rub`}
                  disabled
                />
              </>
            }
            <TextField
              label={t`Passepartout width`}
              field="passepartoutWidth"
              suffix={t`m`}
              disabled={locked}
            />
            <TextField
              label={t`Passepartout count`}
              field="passepartoutCount"
              disabled={locked}
            />
            <SelectField
              label={t`Glass`}
              field="glass"
              defaultValue="regular"
              options={{
                regular: t`Regular glass`,
                antiReflective: t`Anti-reflective glass`,
                museum: t`Museum glass`,
                none: t`No glass`
              }}
              disabled={locked}
            />
            <BooleanField
              label={t`Embroidery stretching`}
              field="embroideryStretching"
              disabled={locked}
            />
            <BooleanField
              label={t`Canvas printing`}
              field="canvasPrinting"
              disabled={locked}
            />
            <BooleanField
              label={t`Photo printing`}
              field="photoPrinting"
              disabled={locked}
            />
            <BooleanField
              label={t`Portrait in character`}
              field="portraitInCharacter"
              disabled={locked}
            />
            <BooleanField
              label={t`Hardboard`}
              field="hardboard"
              disabled={locked}
            />
            <BooleanField
              label={t`Сardboard backpane`}
              field="cardboardBackpane"
              disabled={locked}
            />
            <BooleanField
              label={t`Gluing`}
              field="gluing"
              disabled={locked}
            />
            <BooleanField
              label={t`Mirror`}
              field="mirror"
              disabled={locked}
            />
            <Typography color="error">
              <Button
                style={{ margin: '0 0 0 auto', display: 'block' }}
                color="inherit"
                onClick={this.removeRecord}
              >
                {t`Delete`}
              </Button>
            </Typography>
          </>
        }
      </Translated>
    )
  }
}