import React from 'react';

const propTypes = {

};

const DateTimePicker = props => {
  return (
    <div>
      <form action="/action_page.php">
        <h2>Set Schedule</h2>
        <input type="datetime-local" name="datetime"/>
        <input type="submit" value="Set"/>
      </form>
    </div>
  )
}

export default DateTimePicker;