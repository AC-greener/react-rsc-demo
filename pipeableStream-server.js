require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

// server.js
import express from "express";
import React from "react";
import path from "path";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.use(express.static(path.join(__dirname, "client/dist/assets")));
app.get("/", async (req, res) => {
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

  const htmlEnd = `
        </div>
        <!-- 这里是打包过的js文件 -->
        <script type="module" src="/main.js"></script>
      </body>
    </html>
  `;

  // 将起始的HTML写入响应
  res.write(htmlStart);

  // 调用renderToPipeableStream，传入React App组件
  // 和一个选项对象以处理shell的准备情况
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady: () => {
      // 当shell准备就绪时，将渲染的输出流传输到响应
      res.setHeader("Content-Type", "text/html");
      pipe(res);
    },
    onAllReady: () => {
      // 当所有内容准备就绪时，将结束的HTML写入响应
      res.write(htmlEnd);
      res.end();
    },
    onError: (error) => {
      // 处理错误情况
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
