# HTMX 🔳 HONO 🔳 POCKETBASE EXPERIMENT

## 1. To run todos

- install pocket base then `pocketbase serve`
- then run `bun run dev`
- todo apis on `/api/todos` include `GET`, `POST`, `PATCH`, `DELETE`. but they all return html not json.
- todo page on `/todos` get a single todo on `/todos/:id` were `:id` is the id after you've created a todo on the `/todos` page then finally `/todos/search` for searching for your created todo with any occurrence
- `NOTE:` the application depends on `htmx.min.js` in the static folder.

## 2. To run chat message

- run `bun run dev`
- then go to `/chat` to create a user
- api dependence include `/api/chat/ws` and `/api/chat/messages`
- `NOTE:` the application depends on `htmx.min.js`, `htmx.ws.js`, `chat-style.css` -> to style the page and finally `chat-js.js` -> to place the right chat message bubble in the right place. and all the files can be found in the static folder.

## 3. To run traffic light simulation

- run `bun run dev`

### Not completed
