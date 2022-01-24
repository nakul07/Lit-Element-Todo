import {
  LitElement,
  html,
} from "https://unpkg.com/lit-element@latest/lit-element.js?module";
import "./todo-list.js";

class TodoApp extends LitElement {
  static get properties() {
    return {
      todoList: { type: Array },
    };
  }
  constructor() {
    super();
    this.todoList = [
      { item: "Todo 1", completed: false },
      { item: "Todo 2", completed: true },
      { item: "Todo 3", completed: false },
    ];
  }

  render() {
    return html`
      <style>
        input {
          width: 35%;
          height: 40px;
          padding: 12px 20px;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
          background-color: #f8f8f8;
          font-size: 16px;
          margin-left: 25%;
        }
        button {
          background-color: #4caf50; /* Green */
          border: none;
          border-radius: 3px;
          color: white;
          padding: 7px 20px;
          text-align: center;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
        h1 {
          color: green;
          margin-left: 40%;
        }
      </style>
      <h1>Todo App</h1>

      <input id="todoInputField" placeholder=" Enter your Item" />

      <button @click=${this._addTodo}>Add</button>

      <todo-list
        .todos=${this.todoList}
        @change-todo-finished="${this._changeToFinished}"
        @remove-todo="${this._removeTodo}"
      ></todo-list>
    `;
  }

  _addTodo() {
    const input = this.shadowRoot.getElementById("todoInputField");
    const text = input.value;
    input.value = "";
    // console.log(text);
    this.todoList = [...this.todoList, { item: text, completed: false }];
    //this.requestUpdate();
  }

  _removeTodo(e) {
    this.todoList = this.todoList.filter((todo) => todo !== e.detail);
    // this.requestUpdate();
  }

  _changeToFinished(e) {
    const { changedTodo, finished } = e.detail;

    this.todoList = this.todoList.map((todo) => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }
}
window.customElements.define("todo-app", TodoApp);
