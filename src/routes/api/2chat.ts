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
