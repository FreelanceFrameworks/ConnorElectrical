import React, {Fragment,useMemo} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import PropTypes from 'prop-types';
import moment from "moment";
import "moment-timezone";
import events from "./Event.jsx";

import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale("en-AU");
moment.tz.setDefault('Australia/New Zealand')
const localizer = momentLocalizer(moment);

/*let allViews = Object.keys(views).map((k) => views[k])*/

export default function BackgroundEvents() {
const defaultDate  = useMemo(() => new Date(), [])

  return (
    <Fragment>
    
      <div className="height600">
        <Calendar
           view={["day", "agenda", "week", "month"]}
          backgroundEvents={BackgroundEvents}
          dayLayoutAlgorithm="no-overlap"
          defaultDate={defaultDate}
          defaultView="day"
          events={events}
          localizer={localizer}
       
        
         
        />
      </div>
    </Fragment>
  )
}
BackgroundEvents.propTypes = {
  localizer: PropTypes.instanceOf(localizer),
}