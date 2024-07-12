require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react"]
  });
import App from "./App";
import express from "express";
import React from "react";
import path from "path";    
import ReactDOMServer from "react-dom/server";


const app = express();

app.use(express.static(path.join(__dirname, "client/dist/assets")));
console.log(path.join(__dirname, "static"));
app.get("*", (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My React App</title>
      </head>
      <body>
        <!-- Injecting the rendered App component -->
        <div id="root">${html}</div>
        <!-- Linking to the main JavaScript bundle -->
        <script type="module" src="/main.js"></script> <!-- Corrected path to the main.js -->
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});