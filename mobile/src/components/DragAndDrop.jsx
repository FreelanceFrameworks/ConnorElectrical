import React, {Component} from "react";

import { Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import events from "./Event.jsx";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en");
moment.tz.countries('Australia/New Zealand')

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);


export default class DragAndDrop extends Component {
  constructor(props){
    super(props);
      this.state = {
        events: events
      };
      this.moveEvent = this.moveEvent.bind(this);
      this.newEvent = this.newEvent.bind(this);
    };
    onEventDrop = ({event, start, end, isAllDay}) => {
      const updatedEvent = {...event, start, end, isAllDay};
      // Any other logic. If async saving your change, you'll probably
      // do the next line in a `.then()`
      events((prevEvents) => {
        const filtered = prevEvents.filter((item) => item.id !== event.id);
        return [...filtered, updatedEvent];
      });
    };
    resizeEvent = ({ event, start, end})=> {
      const {events} = this.state;
console.log({events});
      const nextEvents = events.map(existingEvent=>{
        return existingEvent.id == event.id ?
         {...existingEvent, start, end}
         :existingEvent;
      });
      this.setState({
        events: nextEvents
      });
    };

  
  
  /*state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Event Title",
        eventsData: events
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    useMemo(() => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
      []
    )
    data = events
  };*/

 render() {
  return(
<DnDCalendar
  views={["day", "agenda", "week", "month"]}
   localizer={this.props.localizer}
   events={this.state.events}
   onEventDrop={onEventDrop}
   resizable
   onEventResize={this.resizeEvent}
   onSelectSlot={this.newEvent}
   onDragStart={console.log}
   defaultView = "month"
   
   defaultDate={new Date(2025, 3, 1)}
   />
  );
 }
}
