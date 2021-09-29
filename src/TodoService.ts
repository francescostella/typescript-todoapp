import { Todo } from './Model'

export interface ITodoService {
  add(todo: Todo): Todo
  add(todo: string): Todo
  clearCompleted(): void
  getAll(): Todo[]
  getById(todoId: number): Todo
  toggle(todoId: number): void
}

export default class TodoService {
  todos: Todo[]

  constructor(todos) {
    this.todos = todos
  }
}
