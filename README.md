# HTMX 🔳 HONO 🔳 POCKETBASE EXPERIMENT

## 1. To run todos

- install pocket base then `pocketbase serve`
- then run `bun run dev`
- todo apis on `/api/todos` include `GET`, `POST`, `PATCH`, `DELETE`. but they all return html not json.
- todo page on `/todos` get a single todo on `/todos/:id` were `:id` is the id after you've created a todo on the `/todos` page then finally `/todos/search` for searching for your created todo with any occurrence
- `NOTE:` the application depends on `htmx.min.js` in the static folder and `pocket base`.

## 2. To run chat message

- run `bun run dev`
- then go to `/chat` to create a user
- api dependence include `/api/chat/ws` and `/api/chat/messages`
- `NOTE:` the application depends on `htmx.min.js`, `htmx.ws.js`, `chat-style.css` -> to style the page and finally `chat-js.js` -> to place the right chat message bubble in the right place. and all the files can be found in the static folder.

## 3. To run traffic light simulation

- run `bun run dev`
- then go to `/traffic_light` to see simulation
- api dependencies include `/api/traffic_light/time` and `/api/traffic_light?light=1&style=top:140px;left:500px;`
- `NOTE:` the application depends on `htmx.min.js` in the static folder.

## 4. Mini E-Commerce application

- install pocket base then `pocketbase serve` for products
- run `bun run dev`
- also make sure to have a paystack account and import `PAY_STACK_SECRET_KEY` into your `src/lib/routes/api/4mini-ecommerce.ts` page
- `NOTE:` the application depends on`mini-commerce.js`, `mini-commerce-bucket.js` and `htmx.min.js` in the static folder and `pocket base`.

## 5. Auth Text

- run `bun run dev`

### Not completed
