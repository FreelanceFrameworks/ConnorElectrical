import React, { useState } from "react";
import PropTypes from "prop-types";

import "../../style/style.scss";
import "react-date-range/dist/theme/default.css"
import { DateRangePicker} from "react-date-range";

import { addDays, subDays} from "date-fns";

const MyCalendar = ({onChange}) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);
  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };
  return(
    <DateRangePicker
    onChange={handleOnChange}
    showSelectionPreview={true}
    moveRangeOnFirstSelection={false}
    months={4}
    ranges={state}
    direction="horizontal" />

  );
};
MyCalendar.propTypes={
  onChange: PropTypes.func
};
export default MyCalendar;


/*Setting up a basic calendar component 
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from "date-fns";


const offList = [
  new Date(2023, 2, 26),
  new Date(2023, 3, 1),
  new Date(2023, 4, 5),
  new Date(2023, 5, 25),
  new Date(2023, 6, 9),
  new Date(2023, 7, 10)
];




function MyCalendar() {
  const [date, setDate] = useState(undefined);

  const activateTab = (value, event) => {
    offList.forEach((offDate, index) => {
      if (format(offDate, "dd-MM-yyyy") === format(value, "dd-MM-yyyy")) {
        setDate(value);
      }
    });
  };
  return (
    <div className="root">
      <Calendar
        value={date}
        activeStartDate={date}
        onClickDay={activateTab}
        minDetail="year"
      />

      <button
        onClick={() => {
          setDate(offList[0]);
        }}
      >
        Change
      </button>
    </div>
  );
}

export default MyCalendar; */
