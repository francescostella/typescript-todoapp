import { Todo, TodoState } from './Model'
import TodoService, { ITodoService } from './TodoService'
import TodoListComponent from './TodoListComponent'

export class TodoApp {
  private todoService: TodoService
  private todoList: TodoListComponent

  constructor(element, todos) {
    this.todoService = new TodoService(todos)
    this.initialize(element)
  }

  addTodo(todoName: string) {
    this.todoService.add(todoName)
    this.renderTodos()
  }

  clearCompleted() {
    this.todoService.clearCompleted()
    this.renderTodos()
  }

  toggleTodoState(todoId) {
    this.todoService.toggle(todoId)
    this.renderTodos()
  }

  /**
   * Render the full Todos List
   */
  renderTodos(): void {
    const todos = this.todoService.getAll()
    this.todoList.render(todos)
  }

  initialize(element) {
    const _this = this

    const addTodoFormElement = element.querySelector('.add-todo-form')
    const addTodoNameElement = element.querySelector('.add-todo-form__input')
    const todoListElement = element.querySelector('.todo-list')
    const clearCompletedElement = element.querySelector('.clear-completed')

    addTodoFormElement.addEventListener('submit', function(event) {
      _this.addTodo(addTodoNameElement.value)
      addTodoNameElement.value = ''
      event.preventDefault()
    })

    todoListElement.addEventListener('todo-toggle', function(event) {
      const todoId = event.details.todoId
      _this.todoService.toggle(todoId)
      _this.renderTodos
    })

    clearCompletedElement.addEventListener('click', function() {
      _this.clearCompleted()
    })

    this.todoList = new TodoListComponent(todoListElement)
    this.renderTodos()
  }
}