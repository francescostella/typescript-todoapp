import TodoService from './TodoService.js'
import TodoListComponent from './TodoListComponent.js'

export default class TodoApp {
  private todoService: TodoService
  private todoList: TodoListComponent

  constructor(element: HTMLElement, todos: string[]) {
    this.todoService = new TodoService(todos)
    this.initialize(element)
  }

  addTodo(todoName: string): void {
    this.todoService.add(todoName)
    this.renderTodos()
  }

  clearCompleted(): void {
    this.todoService.clearCompleted()
    this.renderTodos()
  }

  toggleTodoState(todoId: number): void {
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

  initialize(element: HTMLElement): void {
    const _this = this

    const addTodoFormElement = element.querySelector('.add-todo-form')
    const addTodoNameElement = <HTMLInputElement>addTodoFormElement.querySelector('.add-todo-form__input')
    const todoListElement = <HTMLElement>element.querySelector('.todo-list')
    const clearCompletedElement = element.querySelector('.add-todo-form__clear')

    addTodoFormElement.addEventListener('submit', function(event) {
      _this.addTodo(addTodoNameElement.value)
      addTodoNameElement.value = '' 
      event.preventDefault()
    })

    todoListElement.addEventListener('todo-toggle', function(event) {
      const todoId = (<CustomEvent>event).detail.todoId
      _this.todoService.toggle(todoId)
      _this.renderTodos()
    })

    clearCompletedElement.addEventListener('click', function() {
      _this.clearCompleted()
    })

    this.todoList = new TodoListComponent(todoListElement)
    this.renderTodos()
  }
}