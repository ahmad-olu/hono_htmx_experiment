import { Hono } from "hono";
import { css, cx, keyframes, Style } from "hono/css";
import { pbDb } from "../../lib/db/pocketBase";
import { RecordModel } from "pocketbase";

interface Todo extends RecordModel {
  text: string;
  completed: boolean;
}

interface CreateTodo {
  text: string;
  completed?: boolean;
}

export const todos_api = new Hono();

todos_api
  .get("/api/todos", async (c) => {
    const page = c.req.query("page");

    const todos_res = await pbDb
      .collection("1Todos")
      .getList(Number.parseInt(page ?? "1"), 4);
    const todos = todos_res.items as Todo[];

    const disabled = {
      disablePrev: () => {
        if (Number.parseInt(page ?? "1") > 1) {
          return "";
        }
        return "disabled";
      },
      disableNext: () => {
        if (Number.parseInt(page ?? "1") < todos_res.totalPages) {
          return "";
        }
        return "disabled";
      },
    };

    const res = `
    <div id="todos-list">
    <ul style="text-align: center">
    ${todos
      .map(
        (todo) =>
          `<li
            id="todo-${todo.id}"
            style="font-family: monospace; font-size: 1.1rem">
                <span><a href="/todos/${todo.id}"> ${todo.text}</a></span>
                <span
                    hx-patch="/api/todos/${todo.id}/completed"
                    hx-vals='{"completed": "${todo.completed}"}'
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                    ${todo.completed ? "✔️" : "❌"} </span>
            <button
            hx-patch="/api/todos/${todo.id}"
            hx-include="#my-form"
            style="color: blue; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML"
          >
            Edit</button>
            <button
            hx-delete="/api/todos/${todo.id}"
            style="color: red; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML">
            Delete
          </button>
            </li>`
      )
      .join("")}
      </ul>
      <div>
            <button
                ${disabled.disablePrev()}
                hx-get="/api/todos?page=${Number.parseInt(page ?? "1") - 1}"
                hx-target="#todos-list"
                hx-swap="outerHTML"
            >⏪️</button>
            <button
                disabled
                style="color: black; font-size: 2rem"
                >${Number.parseInt(page ?? "1")}</button>
            <button
                ${disabled.disableNext()}
                hx-get="/api/todos?page=${Number.parseInt(page ?? "1") + 1}"
                hx-target="#todos-list"
                hx-swap="outerHTML"
            >⏩️</button>
      </div>
      </div>
      `;
    return c.html(res);
    //return c.json(todos);
  })
  .post("/api/todos", async (c) => {
    // const body = (await c.req.json()) as CreateTodo;
    // // console.log((await c.req.json()) as CreateTodo);
    // const todo: Todo = {
    //   id: 4,
    //   text: body.text,
    //   completed: body.completed ?? false,
    // };

    const body = await c.req.formData();
    const data: CreateTodo = {
      text: body.get("text") as string,
      completed: (body.get("completed") as boolean | null) ?? false,
    };

    const todo = (await pbDb.collection("1Todos").create(data)) as Todo;
    const res = `<li>${todo.text} ${todo.completed ? "✔️" : "❌"}</li>`;
    return c.html(res);
    //return c.json(todo);
  });

todos_api
  .get("/api/todos/:id", (c) => {
    const id = c.req.param("id");

    const todos = {
      id: Number.parseInt(id),
      text: "Learn TypeScript",
      completed: false,
    };
    return c.json(todos);
  })
  .delete("/api/todos/:id", async (c) => {
    const id = c.req.param("id");
    await pbDb.collection("1Todos").delete(id);
    return c.html(``);
  })
  .patch("/api/todos/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.formData();
    const data = {
      text: body.get("text") as string,
    };
    const todo = (await pbDb.collection("1Todos").update(id, data)) as Todo;

    return c.html(`<li
            id="todo-${todo.id}"
            style="font-family: monospace; font-size: 1.1rem">
                <span><a href="/todos/${todo.id}"> ${todo.text}</a></span>
                <span
                    hx-patch="/api/todos/${todo.id}/completed"
                    hx-vals='{"completed": "${todo.completed}"}'
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                    ${todo.completed ? "✔️" : "❌"} </span>
            <button
            hx-patch="/api/todos/${todo.id}"
            hx-include="#my-form"
            style="color: blue; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML"
          >
            Edit</button>
            <button
            hx-delete="/api/todos/${todo.id}"
            style="color: red; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML">
            Delete
          </button>
            </li>`);
  })
  .patch("/api/todos/:id/completed", async (c) => {
    const id = c.req.param("id");

    const body = await c.req.formData();
    const completed = (JSON.parse(body.get("completed") as string) as boolean)
      ? false
      : true;
    const data = {
      completed: completed,
    };
    const todo = (await pbDb.collection("1Todos").update(id, data)) as Todo;
    return c.html(`<li
            id="todo-${todo.id}"
            style="font-family: monospace; font-size: 1.1rem">
                <span><a href="/todos/${todo.id}"> ${todo.text}</a></span>
                <span
                    hx-patch="/api/todos/${todo.id}/completed"
                    hx-vals='{"completed": "${todo.completed}"}'
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                    ${todo.completed ? "✔️" : "❌"} </span>
            <button
            hx-patch="/api/todos/${todo.id}"
            hx-include="#my-form"
            style="color: blue; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML"
          >
            Edit</button>
            <button
            hx-delete="/api/todos/${todo.id}"
            style="color: red; margin-right: 1rem"
            hx-target="#todo-${todo.id}"
            hx-swap="outerHTML">
            Delete
          </button>
            </li>`);
  })
  .put("/api/todos/:id", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const body = (await c.req.json()) as CreateTodo;
    // const todos: Todo = {
    //   id: id,
    //   text: body.text,
    //   completed: body.completed ?? false,
    // };
    const todos = {
      id: id,
      text: body.text,
      completed: body.completed ?? false,
    };
    return c.json(todos);
  })
  .post("/api/todos/search", async (c) => {
    const body = await c.req.formData();
    const text = body.get("text") as string;

    const todos = (
      await pbDb
        .collection("1Todos")
        .getList(1, 10, { filter: `text ~ "${text}"` })
    ).items as Todo[];
    const res = `
    <div id="todos-list">
    <ul style="text-align: center">
    ${todos
      .map(
        (todo) =>
          `<li
            id="todo-${todo.id}"
            style="font-family: monospace; font-size: 1.1rem">
                <span>${todo.text}</span>
                <span
                    hx-patch="/api/todos/${todo.id}/completed"
                    hx-vals='{"completed": "${todo.completed}"}'
                    hx-target="#todo-${todo.id}"
                    hx-swap="outerHTML">
                    ${todo.completed ? "✔️" : "❌"} </span>
            </li>`
      )
      .join("")}
      </ul>
      </div>
      `;
    return c.html(res);
  });
