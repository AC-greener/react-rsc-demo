require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"]
});

// server.js
import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.use(express.static("build"));

app.get("/", async (req, res) => {
  // Define the starting HTML structure
  const htmlStart = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Suspense with renderToPipeableStream</title>
      </head>
      <body>
        <div id="root">
  `;

  // Write the starting HTML to the response
  res.write(htmlStart);

  // Call renderToPipeableStream with the React App component
  // and an options object to handle shell readiness
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady: () => {
      // Pipe the rendered output to the response when the shell is ready
      pipe(res);
    },
  });
});

// Start the server on port 3000 and log a message to the console
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
