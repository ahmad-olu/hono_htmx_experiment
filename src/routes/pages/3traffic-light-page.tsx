import { Hono } from "hono";
import { css, Style } from "hono/css";
import { FC } from "hono/jsx";

export const traffic_light = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <Style>{css`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
          }
          .road {
            position: relative;
            width: 100vw;
            height: 100vh;
          }

          .traffic-light {
            background-color: #333;
            border-radius: 10px;
            padding: 10px;
            gap: 10px;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 80px;
            height: 200px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          }

          .light {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #555;
            transition: background-color 0.3s;
          }

          /* Inactive colors - dimmed versions */
          .light.red {
            background-color: rgba(255, 0, 0, 0.2); /* Dimmed red */
          }

          .light.yellow {
            background-color: rgba(255, 255, 0, 0.2); /* Dimmed yellow */
          }

          .light.green {
            background-color: rgba(0, 255, 0, 0.2); /* Dimmed green */
          }

          /* Active colors - bright versions */
          .light.red.active {
            background-color: red;
          }

          .light.yellow.active {
            background-color: yellow;
          }

          .light.green.active {
            background-color: green;
          }
        `}</Style>
        <script src="/static/htmx.min.js"></script>
      </head>
      <body>{props.children}</body>
    </html>
    //style="text-align: center"
  );
};

const TrafficLightPage: FC<{}> = (props: {}) => {
  return (
    <Layout>
      <h1 style="text-align: center">Traffic Light Sim!</h1>
      <div
        style="text-align: center"
        hx-get="/api/traffic_light/time"
        hx-trigger="every 1000ms"
        hx-swap="outerHTML"
      ></div>
      <div class="road">
        <div
          class="traffic-light"
          style="top: 10px; left: 50px;"
          hx-get="/api/traffic_light?light=1&style=top:140px;left:500px;"
          hx-trigger="every 1000ms"
          hx-swap="outerHTML"
        >
          <div class="light red active"></div>
          <div class="light yellow"></div>
          <div class="light green"></div>
        </div>
        <div
          class="traffic-light"
          style="top: 200px; left: 200px;"
          hx-get="/api/traffic_light?light=2&style=top:200px;left:200px;"
          hx-trigger="every 1000ms"
          hx-swap="outerHTML"
        >
          <div class="light red active"></div>
          <div class="light yellow"></div>
          <div class="light green"></div>
        </div>
        <div
          class="traffic-light"
          style="top: 50px; right: 100px;"
          hx-get="/api/traffic_light?light=3&style=top:50px;right:100px;"
          hx-trigger="every 1000ms"
          hx-swap="outerHTML"
        >
          <div class="light red active"></div>
          <div class="light yellow"></div>
          <div class="light green"></div>
        </div>
        <div
          class="traffic-light"
          style="bottom: 130px; left: 150px;"
          hx-get="/api/traffic_light?light=4&style&bottom:130px;left:150px;"
          hx-trigger="every 1000ms"
          hx-swap="outerHTML"
        >
          <div class="light red active"></div>
          <div class="light yellow"></div>
          <div class="light green"></div>
        </div>
      </div>
    </Layout>
  );
};

traffic_light.get("/traffic_light", (c) => {
  return c.html(<TrafficLightPage />);
});

export default traffic_light;
