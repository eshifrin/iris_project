import React, { PropTypes } from 'react';

const propTypes = {
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
};

const DateTimePicker = ({ handleScheduleChange, scheduledDateTime }) => {
  return(
    <div>
        <label>Set Schedule</label>
        <input type="datetime-local" name="datetime" value="" onChange={handleScheduleChange}/>
    </div>
  )
}

export default DateTimePicker;
