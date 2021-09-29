import { Todo, TodoState } from './Model'
import TodoService from './TodoService'
import TodoListComponent from './TodoListComponent'


export default class TodoApp {
  private todoService: TodoService
  private todoList: TodoListComponent

  constructor(element, todos) {
    this.todoService = new TodoService(todos)
    this.initialize(element)
  }

  initialize(element) {

  }
}