import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    container: {
      display: 'inline',
      marginRight: theme.spacing.unit * 2
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop: 0,
      marginBottom: theme.spacing.unit,
      width: theme.spacing.unit * 25
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 300,
    }
  });


class Selector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.changeType(event.target.value);
    this.setState({'name': event.target.value});
  }

  render() {
    const { classes, labelText, extraStyles, defaultValue } = this.props;
    return (
      <form className={classes.container} autoComplete='off' style={extraStyles}>
        <TextField
            id='selector'
            label={labelText ? labelText : 'Choose calculation type!'}
            select
            className={classes.textField}
            value={this.state.name === '' && defaultValue ? defaultValue : this.state.name}
            onChange={this.handleChange}
            margin='normal'
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
          {this.props.textOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </form>
    );
    }
}

export default withStyles(styles)(Selector);
