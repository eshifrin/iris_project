import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import eventMapper from '../lib/event';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);


function Event({ event }) {
  return (
    <span>
      {event.tw && <span><i className="fa fa-twitter fa-1x" /></span>}
      {event.fb && <i className="fa fa-facebook fa-1x" />}
      <span>{'\u00A0\u00A0'}</span>
      {event.title}
    </span>
  );
}

const formats = {
  dayFormat: (date, culture, localizer) => localizer.format(date, 'M/DD', culture),
  eventTimeRangeFormat: ({ start, end }, culture, localizer) => localizer.format(start, 'h:mm a'),
};

const Calendar = props => (
  <BigCalendar
    events={eventMapper(props.scheduledPosts)}
    components={{
      event: Event,
    }}
    defaultDate={new Date()}
    views={['month', 'week']}
    formats={formats}
  />
    );

export default Calendar;
