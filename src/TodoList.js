import React, { Component } from 'react'
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'
import uuid from 'uuid/v4'

import './TodoList.css'

export default class TodoList extends Component {
  state = {
    todos: [
      { task: 'Walk the Dog', id: uuid(), completed: false },
      { task: 'Pet the Cat', id: uuid(), completed: false }
    ]
  }
  addItem = (item) => {
    // Add unique ID to each task before adding it to the list
    const itemWithId = { task: item, id: uuid(), completed: false }
    this.setState({ todos: [...this.state.todos, itemWithId] })
  }
  removeItem = (itemId) => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== itemId) })
  }
  updateItem = (itemId, updatedTask) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === itemId) {
        return { ...todo, task: updatedTask }
      }
      return todo
    })
    this.setState({ todos: updatedTodos })
  }
  toggleCompletion = (itemId) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === itemId) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    this.setState({ todos: updatedTodos })
  }

  // Get todos from local storage
  componentDidMount() {
    localStorage.getItem('todos') && this.setState({ todos: JSON.parse(localStorage.getItem('todos')) })
  }
  // Save todos in local storage
  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
  }

  render() {
    const todos = this.state.todos.map(todo => <Todo
      key={todo.id}
      id={todo.id}
      task={todo.task}
      completed={todo.completed}
      removeItem={this.removeItem}
      updateItem={this.updateItem}
      toggleItem={this.toggleCompletion}
    />)
    return (
      <div className="TodoList">
        <h1 className="TodoList__heading">Todo List</h1>
        <NewTodoForm addItem={this.addItem} />
        <ul className="TodoList__list">
          {todos}
        </ul>
      </div>
    )
  }
}
