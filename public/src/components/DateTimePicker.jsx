import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
};

const DateTimePicker = ({ handleScheduleChange, scheduledDateTime }) => {
  // console.log('date to display at date picker: ', scheduledDateTime)
  const dateObj = (moment(scheduledDateTime)).format('YYYY-MM-DDTHH:mm');
  // console.log('dateObj : ', dateObj )
  return(
    <div>
        <label>Set Schedule : </label>
        <input type="datetime-local" name="datetime" value={dateObj} onChange={handleScheduleChange}/>
    </div>
  )
}

export default DateTimePicker;
