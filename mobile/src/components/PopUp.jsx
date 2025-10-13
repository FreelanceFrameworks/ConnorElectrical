import React, {useMemo } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from "moment";
import "moment-timezone";
import events from "./Event.jsx";
import "../../src/style/style.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-AU");
moment.tz.setDefault('Australia/New Zealand')
const localizer = momentLocalizer(moment);

export default function Popup() {
  const defaultDate = useMemo(() => new Date(), [])
  return (
 
      <div>
        <Calendar
          defaultDate = {defaultDate}
          events = {events}
          localizer = {localizer}
          Popup
        />
      </div>
   
  )
}
Popup.propTypes = {
  localizer: PropTypes.instanceOf(localizer)
}