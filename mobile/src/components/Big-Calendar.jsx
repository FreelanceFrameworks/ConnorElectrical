import React , {useState, useCallback, useMemo} from "react";
import { Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import events from "./Event.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale ("en");
moment.tz.countries('Australia/New Zealand')
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
    const [eventsData, setEventsData] = useState(events);
    const handleSelectSlot = useCallback(({start, end})=>{
        const title = window.prompt('New Event Name')
        if(title){
            var newEvent = {
                start: start,
                end: end,
                title: title
            };
            setEventsData ([...eventsData, newEvent]);
        }
    },
    [setEventsData]
    )
      const handleSelectEvent = useCallback((event)=> window.alert(event.title), [])  
   const {defaultDate, scrollToTime} = useMemo(()=>({
    defaultDate: new Date(),
    scrollToTime: new Date(2025, 1, 1, 6),
   }),
   []
   )
       
    return (
        <div className = "root">
             <strong>
                Click on an event to see more information or click on the calendar to add an event
             </strong>
            <Calendar
            views={["day", "agenda", "week", "month"]}
          localizer={localizer}
            defaultDate = {defaultDate}
            defaultView = "month"
            events={eventsData}
            handleSelectEvent={handleSelectEvent}
            style={{height: "80vh"}}
            onSelectEvent={(event)=> alert(event.title)}
            onSelectSlot = {handleSelectSlot}
            scrollToTime={scrollToTime}
          
            />
   
        </div>
        
    );
  
}