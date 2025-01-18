import { Hono } from "hono";
import type { FC } from "hono/jsx";
import { pbDb } from "../../lib/db/pocketBase";
import { RecordModel } from "pocketbase";

interface Todo extends RecordModel {
  text: string;
  completed: boolean;
}

export const todos = new Hono();

const Layout: FC = (props) => {
  return (
    <html>
      <script src="/static/htmx.min.js"></script>
      <body style="text-align: center">{props.children}</body>
    </html>
  );
};

const TodosPage: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  return (
    <Layout>
      <h1>TODO List!</h1>
      <form
        id="my-form"
        hx-post="/api/todos"
        hx-target="#todos-list"
        hx-swap="outerHTML"
        style="margin-top: 5rem"
      >
        <input type="text" name="text" placeholder="Add a todo" required />
        <button type="submit" style="color: blue; margin-left: 1rem">
          ➕
        </button>
      </form>
      <div id="todos-list" hx-get="/api/todos?page=1" hx-trigger="load"></div>
    </Layout>
  );
};

const TodoPage: FC<{ todo: Todo }> = (props: { todo: Todo }) => {
  return (
    <Layout>
      <h1 style="font-family: monospace; font-size: 4rem">
        {props.todo.text} <span>{props.todo.completed ? "✔️" : "❌"}</span>
      </h1>
    </Layout>
  );
};

const TodoSearchPage: FC<{}> = (props: {}) => {
  return (
    <Layout>
      <h1>TODO Search!</h1>
      <input
        type="text"
        name="text"
        placeholder="search"
        hx-post="/api/todos/search"
        hx-target="#todos-list"
        hx-trigger="keyup changed delay:1000ms"
        hx-swap="outerHTML"
        required
      />
      <div id="todos-list"></div>
    </Layout>
  );
};

todos.get("/todos/search", (c) => {
  return c.html(<TodoSearchPage />);
});
todos.get("/todos/:id", async (c) => {
  const id = c.req.param("id");
  const todo = (await pbDb.collection("1Todos").getOne(id)) as Todo;
  return c.html(<TodoPage todo={todo} />);
});
todos.get("/todos", (c) => {
  const messages = [""];
  return c.html(<TodosPage messages={messages} />);
});

export default todos;
