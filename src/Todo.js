import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {
  state = {
    inEdit: false,
    task: this.props.task
  }
  toggleForm = () => {
    this.setState({ inEdit: !this.state.inEdit })
  }
  handleRemove = () => {
    this.props.removeItem(this.props.id)
  }
  handleUpdate = (e) => {
    e.preventDefault()
    this.props.updateItem(this.props.id, this.state.task)
    this.setState({ inEdit: false })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleToggle = () => {
    this.props.toggleItem(this.props.id)
  }
  render() {
    let result
    if (this.state.inEdit) {
      result = (
        <div className="Todo">
          <form className="Todo__edit-form" onSubmit={this.handleUpdate}>
            <input className="Todo__edit-form-input" type="text" value={this.state.task} name="task" onChange={this.handleChange} />
            <button className="Todo__edit-form-button">Save</button>
          </form>
        </div>
      )
    } else {
      result = (
        <li className="Todo">
          <p className={this.props.completed ? "Todo__task--completed" : "Todo__task"} onClick={this.handleToggle}>
            {this.props.task}
          </p>
          <div class="Todo__buttons">
            <button class="Todo__edit" onClick={this.toggleForm}><i className="fas fa-pen"></i></button>
            <button class="Todo__remove" onClick={this.handleRemove}><i className="fas fa-trash"></i></button>
          </div>
        </li>
      )
    }
    return result
  }
}