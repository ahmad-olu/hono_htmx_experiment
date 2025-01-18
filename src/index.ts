import { Hono } from "hono";
import { createBunWebSocket, serveStatic } from "hono/bun";
import { todos_api } from "./routes/api/todos";
import todos from "./routes/pages/todos";
import chat from "./routes/pages/chat/chat-page";
import { chat_api } from "./routes/api/chat";
import { ServerWebSocket } from "bun";

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

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .post("/api/chat/messages", async (c) => {
    const body = await c.req.formData();
    const data = {
      name: body.get("name") as string,
      chatMessage: body.get("chat_message") as string,
    };

    const htmlForOthers = `
      <div id="conversation" hx-swap-oob="beforeend">
        <div class="message other" data-sender="other">
          <div class="sender">${data.name}</div>
          <p>${data.chatMessage}</p>
        </div>
      </div>
    `;

    server.publish(topic, htmlForOthers);

    const htmlForCurrentUser = `
      <div id="conversation" hx-swap-oob="beforeend">
        <div class="message user" data-sender="current">
          <div class="sender">You</div>
          <p>${data.chatMessage}</p>
        </div>
      </div>
    `;
    return c.html(htmlForCurrentUser);
    //return c.json(todo);
  });

//ws://localhost:3000/api/chat/ws
//{"chat_message":"jjj","name":"aaa"}

chat_api.get(
  "/api/chat/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(_event, _ws) {
        //     const html = `
        //   <div id="conversation" hx-swap-oob="beforeend">
        //     <div class="message other">
        //       <div class="sender">${name}</div>
        //       <p>${chat_message}</p>
        //     </div>
        //   </div>
        // `;
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

export default app;

//traffic light simulation
// what multiplayer
//login in / logout/ user auth.
// mini chat app
