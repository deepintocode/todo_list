import React, { Component } from 'react'
import './NewTodoForm.css'

export default class NewTodoForm extends Component {
  state = {
    todo: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.todo)
    this.setState({ todo: '' })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.handleSubmit}>
        <input className="NewTodoForm-input" required type="text" placeholder="New Task" name="todo" id="todo" value={this.state.todo} onChange={this.handleChange} />
        <button className="NewTodoForm-button">Add Task</button>
      </form>
    )
  }
}
