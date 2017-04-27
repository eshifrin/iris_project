import React, { PropTypes } from 'react';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

const propTypes = {
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
};

const DateTimePicker = ({ handleScheduleChange, scheduledDateTime }) => {
  const dateObj = (moment(scheduledDateTime)).format('YYYY-MM-DDTHH:mm');
  return (
    <div>
      <input type="datetime-local" name="datetime" value={dateObj} onChange={handleScheduleChange} />
    </div>
  );
};

export default DateTimePicker;
