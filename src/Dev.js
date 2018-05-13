import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Typography variant="button" className={classes.button}>
        Typography
      </Typography>
      <Button variant="raised" className={classes.button}>
        Default
      </Button>
      <Button variant="raised" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="raised" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="raised" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button className={classes.button}>Default</Button>
      <Button color="primary" className={classes.button}>
        Primary
      </Button>
      <Button color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button disabled className={classes.button}>
        Disabled
      </Button>
      <Button href="#flat-buttons" className={classes.button}>
        Link
      </Button>
      <Button disabled href="/" className={classes.button}>
        Link disabled
      </Button>
      <Button className={classes.button} data-something="here I am">
        Does something
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
}

export default withStyles(styles)(RaisedButtons);
