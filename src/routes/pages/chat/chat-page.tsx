import { Hono } from "hono";
import type { FC } from "hono/jsx";

export const chat = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <script src="/static/htmx.min.js"></script>
        <script src="/static/htmx.ws.js"></script>
        <script src="/static/chat-js.js"></script>

        <link rel="stylesheet" href="/static/chat-style.css" />
      </head>
      <body style="text-align: center">{props.children}</body>
    </html>
  );
};

const ChatPage: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  return (
    <Layout>
      <h1>Chat Page!</h1>
      <form action="/api/chat" method="post" style="margin-top: 5rem">
        <input type="text" name="sudo-name" placeholder="Sudo Name" required />
        <button type="submit" style="color: green; margin-left: 1rem">
          Go In
        </button>
      </form>
    </Layout>
  );
};

const ChatMessagePage: FC<{ name: string }> = (props: { name: string }) => {
  return (
    <Layout>
      <div hx-ext="ws" ws-connect={`/api/chat/ws`} class="chat-container">
        <h1 style="text-align: center">{props.name}</h1>
        <div
          id="conversation"
          class="chat-container"
          hx-swap-oob="beforeend"
        ></div>
        <form
          id="form"
          class="input-container"
          hx-vals={`{"name": "${props.name}" }`}
          ws-send
        >
          <input
            type="text"
            placeholder="Type a message..."
            name="chat_message"
          />
          <button>Send</button>
        </form>
      </div>
    </Layout>
  );
};

// <form
//   id="form"
//   class="input-container"
//   hx-vals={`{"name": "${props.name}" }`}
//   ws-send
// ></form>

chat.get("/chat/messages/:name", (c) => {
  const name = c.req.param("name");
  return c.html(<ChatMessagePage name={name} />);
});

chat.get("/chat", (c) => {
  const messages = [""];
  return c.html(<ChatPage messages={messages} />);
});

export default chat;

//? ----------------old implementation
// const ChatMessagePage: FC<{ name: string }> = (props: { name: string }) => {
//   return (
//     <Layout>
//       <div hx-ext="ws" ws-connect={`/api/chat/ws`} class="chat-container">
//         <h1 style="text-align: center">{props.name}</h1>
//         <div
//           id="conversation"
//           class="chat-container"
//           hx-swap-oob="beforeend"
//         ></div>
//         <form id="form" class="input-container">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             name="chat_message"
//           />
//           <button
//             hx-vals={`{"name": "${props.name}" }`}
//             hx-post="/api/chat/messages"
//             hx-target="#conversation"
//             hx-swap="beforeend"
//             hx-include="#form"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };
