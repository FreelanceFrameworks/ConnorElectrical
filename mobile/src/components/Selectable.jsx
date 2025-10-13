import React, {Fragment, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {Calendar, Views, DateLocalizer} from "react-big-calendar"
import events from "./Event.jsx"
export default function Selectable({localizer})
{
const [myEvents, setEvents] = useState(events)
const handleSelectSlot = useCallback(
    ({start, end})=>{
        const title = window.prompt('New Event Name')
        if(title){
            setEvents((prev)=> [...prev, {start, end, title}])
        }

       
    },
    [setEvents]
)
const handleSelectEvent = useCallback((event) => window.alert(event.title), [])
const {defaultDate, scrollToTime} = useMemo(
    ()=>({
        defaultDate: new Date (2025, 1, 29),
        scrollToTime: new Date(2030, 1, 29),
    }),
[]
)
return (
    <Fragment>
        <strong>
            Click an event to see more information or select a day or time range to add an event
        </strong>
        <div>
            <Calendar
            defaultDate={defaultDate}
            defaultView={Views.WORK_WEEK}>
            events={myEvents}
            localizer={localizer}
            onSelectEvent = {handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            Selectable
            scrollToTime={scrollToTime}</Calendar>
          
        </div>
    </Fragment>
)
}
Selectable.propTypes = {localizer: PropTypes.instanceOf(DateLocalizer)}