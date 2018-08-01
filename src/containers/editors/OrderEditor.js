import React from 'react'
import { renderToStaticMarkup as renderHtml } from 'react-dom/server'
import JSON5 from 'json5'
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
import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'

import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'

import goldenLogoPng from '~/assets/golden-logo.png'

import jsonToJSX from '~/utils/jsonToJSX'

const onloadAll = (...images) => {
  return Promise.all(images.map(img => 
    new Promise(r =>
      img.addEventListener('load', r)
    )
  ))
}

const printCheck = (order, rootNode) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const logo = new Image()
  const image = new Image()

  const renderedHtml = renderHtml(
    <svg xmlns="http://www.w3.org/2000/svg" width="296" height="420">
      <foreignObject width="100%" height="100%">
        <main xmlns="http://www.w3.org/1999/xhtml" style={{
          height: '100%',
          //background: '#1e1e1e',
        }}>
          <style>{`
            * { box-sizing: border-box }
            .root { color: #777799 }
            .boolean { color: #569CD6 }
            .string { color: #CE9178 }
            .number { color: #A6CEA8 }
            .undefined { color: #569CD6 }
            .null { color: #569CD6 }
          `}</style>
          <div style={{
            paddingTop: 1,
            position: 'absolute',
            //opacity: .2,
          }}>
            <pre>
              {jsonToJSX(order)}
            </pre>
          </div>
          <div style={{
            position: 'absolute',
            //top: '50%',
            left: '50%',
            transform: 'translate(-50%, 0/*-50%*/)',
            background: 'rgba(255,255,255,.8)',
            padding: '1em',
            fontSize: 8,
          }}>
            <div style={{textAlign: 'center'}}>
              <h1>Золотой Квадрат</h1>
              <h2>Багетная мастерская</h2>
            </div>
            <table border="1">
              <tbody>
                <tr>
                  <td>Артикул рамы</td>
                  <td>{order.frameVendorCode}</td>
                </tr>
                <tr>
                  <td>Ширина рамы</td>
                  <td>{order.frameWidth * 100} см</td>
                </tr>
                <tr>
                  <td>Цена рамы</td>
                  <td>{order.framePrice} руб</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </foreignObject>
    </svg>
  )
  image.src = 'data:image/svg+xml,' + encodeURIComponent(renderedHtml)
  logo.src = goldenLogoPng
  onloadAll(image, logo).then(() => {
    canvas.width = 1480
    canvas.height = 2100

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    context.drawImage(logo, 0, 0, 50, 50)

    canvas.toBlob(blob => {
      window.open('', '_blank').document.write(renderHtml(
        <>
          <title>Печать</title>
          <body style={{ margin: 0 }}>
            <img
              src={URL.createObjectURL(blob)}
              style={{
                maxWidth: '100%',
                maxHeight: '100vh',
                margin: '0 auto',
                display: 'block'
              }}
            />
            <script>
              /*
              document.currentScript.previousSibling.onload = {(
                function () {
                  print()
                  close()
                }
              ).toString()}
              */
            </script>
          </body>
        </>
      ))
    })
  })
}

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
  frameFieldHeader: {
    display: 'flex',
    '& > :first-child': {
      flex: 1
    }
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

class ClientEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchingFrame:
        !props.formApi.values.frameName
        && !props.formApi.values.placed
    }
  }

  printCheck = () => {
    printCheck(this.props.formApi.values)
  }

  removeRecord = () => {
    this.props.jsonrpc('removeRecord', this.props.formApi.values)
    this.props.onChange(null)
  }

  toggleFrameSearch = () => {
    if (!this.props.formApi.values.placed)
      this.setState(state => ({
        searchingFrame: !state.searchingFrame,
        frameSearchFilter: ''
      }))
  }

  handleFrameSearchTextChange = e => this.setState({
    frameSearchFilter: e.target.value
  })

  frameSearchFilterProps = ['name', 'vendorCode']

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
                field="workWidth"
                suffix={t`m`}
                constant={locked}
              />
              <TextField
                label={t`Work height`}
                field="workHeight"
                suffix={t`m`}
                constant={locked}
              />
              <div className={classes.marginBottom16}>
                <div className={classes.frameFieldHeader}>
                  <div>
                    <Typography variant="caption" gutterBottom>
                      {t`Frame`}
                    </Typography>
                    <Typography variant="subheading">
                      {values.frameName}
                    </Typography>
                  </div>
                  {!locked && !this.state.searchingFrame &&
                    <IconButton onClick={this.toggleFrameSearch} >
                      <EditIcon />
                    </IconButton>
                  }
                </div>
                {this.state.searchingFrame &&
                  <TextField
                    helperText={false}
                    onChange={this.handleFrameSearchTextChange}
                    prefix={<SearchIcon color="action" />}
                    suffix={
                      <IconButton onClick={this.toggleFrameSearch}>
                        <ClearIcon />
                      </IconButton>
                    }
                  />
                }
                {this.state.searchingFrame &&
                  <Paper className={classes.marginBottom16}>
                    <RecordList
                      ListProps={{ style: { height: 200 } }}
                      primaryKey="name"
                      secondaryKey="vendorCode"
                      //filter={this.state.filter}
                      onRecordClick={this.handleFrameClick}
                      //hiddenRecordsMessage={this.hiddenRecordsMessage}
                      loadAdditionalRecords={this.loadAdditionalFrames}
                      filter={this.state.frameSearchFilter}
                      filterProps={this.frameSearchFilterProps}
                    />
                  </Paper>
                }
                {values.frameName &&
                  <table
                    onClick={this.toggleFrameSearch}
                  >
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
                        <td>{values.frameWidth * 100} {t`cm`}</td>
                        <td>{values.framePrice} {t`rub`}</td>
                      </Typography>
                    </tbody>
                  </table>
                }
              </div>
              <TextField
                label={t`Passepartout width`}
                field="passepartoutWidth"
                suffix={t`m`}
                constant={locked}
              />
              {Boolean(Number(values.passepartoutWidth)) &&
                <TextField
                  label={t`Passepartout count`}
                  field="passepartoutCount"
                  constant={locked}
                />
              }
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

export default withStyles(styles)(ClientEditor)