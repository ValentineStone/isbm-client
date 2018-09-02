import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import Inspector from '~/components/Inspector'
import BooleanField from '~/components/form/BooleanField'
import TextField from '~/components/form/TextField'
import SelectField from '~/components/form/SelectField'
import RecordField from '~/components/form/RecordSelectorField'
import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'

import RecordFetcher from '~/containers/RecordFetcher'

import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'

import printCheck from './printCheck'

import framePriceCalc from '~/utils/framePriceCalc'

const FRAME_SEARCH_FILTER_PROPS = ['name', 'vendorCode']
const CLIENT_SEARCH_FILTER_PROPS = ['fullName', 'contacts']

const styles = {
  deleteButton: {
    margin: '0 0 0 auto',
    display: 'block'
  },
  tableRow: {
    display: 'table-row',
  },
  marginBottom16: {
    marginBottom: 16
  },
  marginBottom8: {
    marginBottom: 8
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    '@media (max-width:940px)': {
      display: 'block',
    },
    '& > .core-fields': {
      minWidth: 300,
      maxWidth: 350,
      marginRight: 16,
      padding: 16,
      '@media (max-width:940px)': {
        marginRight: 'unset'
      },
    },
    '& > .optionsAndPrice': {
      minWidth: 250,
      maxWidth: 250,
      '& > .options': {
        padding: 16,
        marginBottom: 16
      },
      '& > .price': {
        padding: 16
      },
      '@media (max-width:940px)': {
        maxWidth: 350
      },
    }
  },
  controlButtons: {
    display: 'flex',
    '& > :first-child': {
      flex: 1
    }
  }
}

class OrderEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchingFrame:
        !props.formApi.values.frameName
        && !props.formApi.values.placed
    }
    props.subsribeToChange(this.handleChange)
  }

  handleChange = (formState, formApi) => {
    if (formApi && formState) {
      const price = framePriceCalc(formState.values)
      if (price !== formState.values.price)
        formApi.setValue('price', framePriceCalc(formState.values))
    }
  }

  printCheck = () => {
    printCheck(this.props.formApi.values)
  }

  removeRecord = () => {
    this.props.jsonrpc('removeRecord', this.props.formApi.values)
    this.props.onChange(null)
  }

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

  handleFrameClick = frame => {
    this.props.formApi.setValue('frameName', frame.name)
    this.props.formApi.setValue('frameVendorCode', frame.vendorCode)
    this.props.formApi.setValue('frameWidth', frame.frameWidth)
    this.props.formApi.setValue('framePrice', frame.framePrice)
    this.props.formApi.setValue('frameId', frame.id)
  }

  handleClientClick = client => {
    this.props.formApi.setValue('clientId', client.id)
  }

  createSummary = order => {
    return `${order.frameName} [${order.frameVendorCode
      }] ${order.workWidth}x${order.workHeight}, (${order.passepartoutWidth})`
  }

  render() {
    const values = this.props.formApi.values
    const classes = this.props.classes
    const locked = Boolean(values.placed)

    return (
      <Translated keyed>
        {(t, i18n) =>
          <div className={classes.root}>
            <Paper className="core-fields">
              {values.placed &&
                <Typography color="textSecondary" gutterBottom align="center">
                  {t`Placed on`}
                  {' '}
                  {new Date(values.placed)
                    .toLocaleString(i18n.lang)}
                </Typography>
              }
              <div className={classes.marginBottom8}>
                <Typography variant="caption" style={{ display: 'inline' }}>
                  {t`Order number`}
                </Typography>
                <Typography style={{ float: 'right' }}>
                  {values.indexOfType}
                </Typography>
              </div>
              <Divider className={classes.marginBottom8} />
              <RecordField
                label={t`Orderer`}
                filterProps={this.CLIENT_SEARCH_FILTER_PROPS}
                primaryKey="fullName"
                secondaryKey="contacts"
                onRecordClick={this.handleClientClick}
                formApi={this.props.formApi}
                recordType="Individual"
              >
                <RecordFetcher id={values.clientId} type="Individual">
                  {client => 
                    <Typography variant="subheading">
                      {client.fullName}
                    </Typography>
                  }
                </RecordFetcher>
              </RecordField>
              <TextField
                multiline
                label={t`Name[object]`}
                field="name"
                constant={locked}
              />
              <TextField
                multiline
                label={t`Note`}
                field="note"
                constant={locked}
              />
              <TextField
                label={t`Work width`}
                scale={0.01}
                field="workWidth"
                suffix={t`cm`}
                constant={locked}
              />
              <TextField
                label={t`Work height`}
                scale={0.01}
                field="workHeight"
                suffix={t`cm`}
                constant={locked}
              />
              <RecordField
                label={t`Frame`}
                displayProp="frameName"
                filterProps={this.FRAME_SEARCH_FILTER_PROPS}
                primaryKey="name"
                secondaryKey="vendorCode"
                onRecordClick={this.handleFrameClick}
                formApi={this.props.formApi}
                recordType="Material"
              />
              {values.frameId &&
                <table className={classes.marginBottom8}>
                  <tbody>
                    <Typography
                      variant="caption"
                      component="tr"
                      className={classes.tableRow}
                    >
                      <td>{t`Vendor code`}</td>
                      <td>{t`Width`}</td>
                      <td>{t`Price`}</td>
                    </Typography>
                    <Typography
                      component="tr"
                      className={classes.tableRow}
                    >
                      <td>{values.frameVendorCode}</td>
                      <td>{+(values.frameWidth * 100).toFixed(2)} {t`cm`}</td>
                      <td>{values.framePrice} {t`rub`}</td>
                    </Typography>
                  </tbody>
                </table>
              }
              <TextField
                label={t`Passepartout width`}
                field="passepartoutWidth"
                scale={0.01}
                suffix={t`cm`}
                constant={locked}
              />
              {Boolean(Number(values.passepartoutWidth)) &&
                <TextField
                  label={t`Passepartout count`}
                  field="passepartoutCount"
                  constant={locked}
                  defaultValue={1}
                />
              }
              {Boolean(Number(values.passepartoutWidth)) &&
                <TextField
                  label={t`Passepartout vendor code(s)`}
                  field="passepartoutVendorCode"
                  constant={locked}
                />
              }
              <TextField
                label={t`Photoshop`}
                field="photoshopPrice"
                scale={1}
                suffix={t`rub`}
                constant={locked}
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
                constant={locked}
              />
            </Paper>
            <div className="optionsAndPrice">
              <Paper className="options">
                <BooleanField
                  label={t`Embroidery stretching`}
                  field="embroideryStretching"
                  constant={locked}
                />
                <BooleanField
                  label={t`Canvas printing`}
                  field="canvasPrinting"
                  constant={locked}
                />
                <BooleanField
                  label={t`Photo printing`}
                  field="photoPrinting"
                  constant={locked}
                />
                <BooleanField
                  label={t`Portrait in character`}
                  field="portraitInCharacter"
                  constant={locked}
                />
                <BooleanField
                  label={t`Hardboard`}
                  field="hardboard"
                  constant={locked}
                />
                <BooleanField
                  label={t`Сardboard backpane`}
                  field="cardboardBackpane"
                  constant={locked}
                />
                <BooleanField
                  label={t`Gluing`}
                  field="gluing"
                  constant={locked}
                />
                <BooleanField
                  label={t`Mirror`}
                  field="mirror"
                  constant={locked}
                />
                <BooleanField
                  label={t`Underframe`}
                  field="underframe"
                  constant={locked}
                />
              </Paper>
              <Paper className="price">

                {values.price &&
                  <>
                    <Typography variant="caption" gutterBottom>
                      {t`Price`}
                    </Typography>
                    <Typography variant="display1" gutterBottom>
                      {values.price.toFixed(2)} {t`rub`}
                    </Typography>
                  </>
                }
                <div className={classes.controlButtons}>
                  {values.price && !values.placed &&
                    <Button color="primary" fullWidth onClick={this.handlePlaceOrder}>
                      {t`Place order`}
                    </Button>
                  }
                  {values.placed &&
                    <Button color="primary" fullWidth onClick={this.printCheck}>
                      {t`Print`}
                    </Button>
                  }
                  {locked ||
                    <Typography color="error">
                      <Button
                        fullWidth
                        className={classes.deleteButton}
                        color="inherit"
                        onClick={this.removeRecord}
                      >
                        {t`Delete`}
                      </Button>
                    </Typography>
                  }
                </div>
              </Paper>
            </div>
          </div>
        }
      </Translated>
    )
  }
}

export default withStyles(styles)(OrderEditor)