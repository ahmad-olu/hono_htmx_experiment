import { Hono } from "hono";
import { createBunWebSocket, serveStatic } from "hono/bun";
import { todos_api } from "./routes/api/1todos";
import todos from "./routes/pages/1todos";
import chat from "./routes/pages/2chat-page";
import { chat_api } from "./routes/api/2chat";
import { ServerWebSocket } from "bun";
import traffic_light from "./routes/pages/3traffic-light-page";
import { traffic_light_api } from "./routes/api/3traffic-light";
import { mini_e_commerce_api } from "./routes/api/4mini-ecommerce";
import mini_commerce from "./routes/pages/4mini-ecommerce-page";
import { auth_5 } from "./routes/pages/5auth-page";
import { auth_test_api } from "./routes/api/5auth";

export const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket>();
//bun run dev
//pocketbase serve
const app = new Hono();
const topic = "anonymous-chat-room";
const server = Bun.serve({
  fetch: app.fetch, // Serve the Hono app
  port: 3000, // Specify the server port
  websocket,
});

app.use("/static/*", serveStatic({ root: "./" }));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

//ws://localhost:3000/api/chat/ws
//{"chat_message":"jjj","name":"aaa"}

chat_api.get(
  "/api/chat/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, _ws) {
        const { chat_message, name } = JSON.parse(event.data.toString());
        const html = `
          <div id="conversation" hx-swap-oob="beforeend">
            <div class="message other" data-sender="other">
              <div class="sender">${name}</div>
              <p>${chat_message}</p>
            </div>
          </div>
        `;

        server.publish(topic, html);
        // ws.send(html);
      },
      onOpen: (_event, ws) => {
        const rawWs = ws.raw as ServerWebSocket;
        rawWs.subscribe(topic);
        console.log("HTMX WebSocket client connected");
      },
      onClose: (_event, ws) => {
        const rawWs = ws.raw as ServerWebSocket;
        rawWs.unsubscribe(topic);
      },
    };
  })
);

app.route("/", todos_api);
app.route("/", todos);
app.route("/", chat);
app.route("/", chat_api);
app.route("/", traffic_light);
app.route("/", traffic_light_api);
app.route("/", mini_e_commerce_api);
app.route("/", mini_commerce);
app.route("/", auth_test_api);
app.route("/", auth_5);

export default app;

//wot multiplayer
//login in / logout/ user auth / profile page.
// graph, pie chart, bar chart and data

//? -----------------> old implementation
//   .post("/api/chat/messages", async (c) => {
//     const body = await c.req.formData();
//     const data = {
//       name: body.get("name") as string,
//       chatMessage: body.get("chat_message") as string,
//     };

//     const htmlForOthers = `
//       <div id="conversation" hx-swap-oob="beforeend">
//         <div class="message other" data-sender="other">
//           <div class="sender">${data.name}</div>
//           <p>${data.chatMessage}</p>
//         </div>
//       </div>
//     `;

//     server.publish(topic, htmlForOthers);

//     const htmlForCurrentUser = `
//       <div id="conversation" hx-swap-oob="beforeend">
//         <div class="message user" data-sender="current">
//           <div class="sender">You</div>
//           <p>${data.chatMessage}</p>
//         </div>
//       </div>
//     `;
//     return c.html(htmlForCurrentUser);
//     //return c.json(todo);
//   });
