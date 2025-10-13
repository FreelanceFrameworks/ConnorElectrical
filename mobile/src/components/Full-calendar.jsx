import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';

export default function FullCalendarComponent() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    };
    return (
        <div className = "root">
            <h1> Calendar Bookings</h1>
            <FullCalendar
            plugins={[dayGridPlugin,
            interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            dateClick={(e) => handleDateClick(e)}
            events={[
                {title: "event 1", date: "2025-01-09"},
                { title: "event 2", date: "2025-03-15"}
            ]}
            eventContent={renderEventContent}
           
            />
         
        </div>
    );
}
function renderEventContent(eventInfo){
   
    return (
        <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        </>
    );
   

}