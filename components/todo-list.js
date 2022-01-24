import {
  LitElement,
  html,
} from "https://unpkg.com/lit-element@latest/lit-element.js?module";

class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  constructor() {
    super();
    this.textDecoration = "line-through";
  }

  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
      <style>
        button {
          background-color: transparent;
          border: none;
          float: right;
        }
        li {
          margin-bottom: 2px;
          width: 70%;
          height: 50px;
          padding: 12px 20px;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
          background-color: #f8f8f1;
          font-size: 16px;
        }
        ul {
          margin-left: 15%;
        }
      </style>
      <ul>
        ${this.todos.map(
          (todo) => html`
            <li
              style="text-decoration:${todo.completed
                ? this.textDecoration
                : "none"}"
            >
              <input
                type="checkbox"
                .checked=${todo.completed}
                @change=${(e) => this._changeTodoFinished(e, todo)}
              />
              ${todo.item}
              <button @click=${() => this._removeTodo(todo)}>X</button>
            </li>
          `
        )}
      </ul>
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(
      new CustomEvent("change-todo-finished", { detail: eventDetails })
    );
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent("remove-todo", { detail: item }));
  }
}

window.customElements.define("todo-list", TodoList);
