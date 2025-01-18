import { Hono } from "hono";
import { css, cx, keyframes, Style } from "hono/css";
import { pbDb } from "../../lib/db/pocketBase";
import { RecordModel } from "pocketbase";
import { upgradeWebSocket } from "../..";

export const chat_api = new Hono();

chat_api.post("/api/chat", async (c) => {
  const body = await c.req.formData();
  const name = body.get("sudo-name") as string;

  return c.redirect(`/chat/messages/${name}`);
});
//   .post("/api/chat/messages", async (c) => {
//     const body = await c.req.formData();
//     const data = {
//       name: body.get("name") as string,
//       chatMessage: body.get("chat_message") as string,
//     };
//     const html = `
//       <div id="conversation" hx-swap-oob="beforeend">
//         <div class="message user">
//           <div class="sender">You</div>
//           <p>${data.chatMessage}</p>
//         </div>
//       </div>
//     `;
//     return c.html(html);
//     //return c.json(todo);
//   });
