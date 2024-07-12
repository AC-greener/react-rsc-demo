import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from '../../App2.jsx'
console.log("Hello from main.js");
hydrateRoot(document, <App />);