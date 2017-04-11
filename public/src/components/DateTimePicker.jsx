import React, { PropTypes } from 'react';

const propTypes = {
  handleScheduleChange: PropTypes.func.isRequired,
};

const DateTimePicker = ({ handleScheduleChange }) => {
  return(
    <div>
        <label>Set Schedule</label>
        <input type="datetime-local" name="bdaytime" onChange={handleScheduleChange}/>
    </div>

  )
}

export default DateTimePicker;