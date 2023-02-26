import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../style/style.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <div className = "main">
        <App />
        </div>
    </StrictMode>
)

/*import React from "react";
import {createRoot } from "react-dom/client";
import App from "./App.jsx"
createRoot(document.getElementById('root')).render(<App />)*/