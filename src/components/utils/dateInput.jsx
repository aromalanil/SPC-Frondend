import { TextField } from '@material-ui/core';
import React from 'react';
import { validateDateOfBirth } from '../../helpers/validation';
import useDebounce from '../../hooks/useDebounce';

const DateInput = ({ label, name, value, onChange, errorMsg, setErrorMsg, id }) => {
  const handleChange = (e) => {
    onChange(e);
    delayedHandleError(e);
  };
  const handleError = (e) => {
    let msg;
    switch (e.target.name) {
      case 'dob': {
        msg = validateDateOfBirth(e.target.value, 18, 'Date of Birth', true);
        break;
      }
      default:
        msg = '';
    }
    setErrorMsg(e, msg);
  };

  const delayedHandleError = useDebounce(handleError, 1000);
  return (
    <div className="input">
      <TextField
        id={id}
        type="date"
        label={label}
        name={name}
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        onChange={handleChange}
        error={errorMsg !== ''}
        helperText={errorMsg}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default DateInput;