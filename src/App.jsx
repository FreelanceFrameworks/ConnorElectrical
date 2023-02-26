import React from "react";
import MyCalendar from "./Components/Calendar.jsx";

import "../style/style.scss";
const App = () => {
    const onChange = (ranges) => {
        console.log(ranges);
    };
    return (
        
            <MyCalendar onChange={onChange} />
       
    );
};
export default App;


/*Setting up a basic react app and importing the calendar 
import React, {Component} from "react";
import MyCalendar from "../src/Components/Calendar.jsx"


export default class App extends Component{
    render(){
        return(
            <h1>Calendar App</h1>,
            <MyCalendar />
        )
    }
} */