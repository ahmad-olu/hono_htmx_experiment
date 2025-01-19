import { Hono } from "hono";

export const traffic_light_api = new Hono();

const lightTimers: Record<string, { state: string; timer: number }> = {
  1: { state: "red", timer: 0 },
  2: { state: "red", timer: 5 },
  3: { state: "red", timer: 10 },
  4: { state: "red", timer: 15 },
};
function getNextState(lightId: string) {
  const light = lightTimers[lightId];
  if (light.state === "red" && light.timer >= 10) {
    light.state = "green";
    light.timer = 0;
  } else if (light.state === "green" && light.timer >= 15) {
    light.state = "yellow";
    light.timer = 0;
  } else if (light.state === "yellow" && light.timer >= 3) {
    light.state = "red";
    light.timer = 0;
  } else {
    light.timer++;
  }
}

traffic_light_api
  .get("/api/traffic_light/time", async (c) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    //! HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const res = `
  <div
    style="text-align: center"
    hx-get="/api/traffic_light/time"
    hx-trigger="every 1000ms"
    > <h4> ${formattedTime}</h4>
  </div>`;
    return c.html(res);
  })
  .get("/api/traffic_light", (c) => {
    const lightId = c.req.query("light");
    const style = c.req.query("style");
    if (!lightId || !lightTimers[lightId]) {
      return c.html(`<div>Invalid traffic light ID</div>`, 400);
    }

    getNextState(lightId);
    const light = lightTimers[lightId];
    const html = `
    <div class="traffic-light"
         style="${style}"
         hx-get="/api/traffic_light?light=${lightId}&style=${style}"
         hx-trigger="every 1000ms"
         hx-swap="outerHTML">
      <div class="light red ${light.state === "red" ? "active" : ""}"></div>
      <div class="light yellow ${
        light.state === "yellow" ? "active" : ""
      }"></div>
      <div class="light green ${light.state === "green" ? "active" : ""}"></div>
    </div>
  `;

    return c.html(html);
  });
