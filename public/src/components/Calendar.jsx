import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';


BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

let Calendar = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date()}
      />
    )
  }
})

export default Calendar;
